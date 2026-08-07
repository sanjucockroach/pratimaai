import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/services", "/work", "/about", "/contact"] as const;

for (const route of routes) {
  test(`${route} renders semantic content without serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  });
}

test("the homepage makes the offer and conversion paths clear", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Clear.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Precise.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Connected.");
  await expect(page.getByRole("link", { name: /Start on WhatsApp/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Email us/i }).first()).toBeVisible();
  await expect(page.getByText("Learn to see clearly.")).toBeVisible();
  await expect(page.locator("video source").first()).toHaveAttribute(
    "src",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4",
  );
});

test("navigation reaches every public route", async ({ page }) => {
  for (const name of ["Services", "Work", "About", "Contact"] as const) {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("link", { name, exact: true }).first().click();
    await expect(page).toHaveURL(new RegExp(`/${name.toLowerCase()}$`));
  }
});

test("supporting heroes express the adapted PRATIMA AI directions", async ({ page }) => {
  await page.goto("/services");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Three practices.One line of sight.");
  await expect(page.locator(".services-cinema__media source")).toHaveAttribute(
    "src",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
  );
  await expect(page.locator(".services-cinema__media video")).toHaveAttribute(
    "poster",
    "/assets/services-hero-poster.png",
  );
  await expect(page.locator(".services-cinema__media video")).toHaveAttribute("autoplay", "");
  await expect(page.locator(".services-cinema__media video")).toHaveAttribute("loop", "");
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Our team");
  await expect(page.getByText("3D Shape")).toBeVisible();
  await expect(page.getByRole("link", { name: /Discover Us/i })).toBeVisible();
  await expect(page.locator(".about-team-hero img")).toHaveCount(5);
  await expect(page.getByRole("button", { name: "Previous team figure" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Next team figure" })).toBeVisible();
  await expect(page.locator(".about-team-hero")).toHaveCSS("background-color", "rgb(244, 132, 95)");
  await page.getByRole("button", { name: "Next team figure" }).click();
  await expect(page.locator(".about-team-hero")).toHaveCSS("background-color", "rgb(107, 191, 122)");
  await expect(page.getByAltText("Temporary PRATIMA AI team figurine 2")).toBeVisible();
});

test("the About carousel uses its specified mobile geometry", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  const activeFigure = page.getByAltText("Temporary PRATIMA AI team figurine 1").locator("..");
  const geometry = await activeFigure.evaluate((element) => {
    const styles = window.getComputedStyle(element);
    return { height: Number.parseFloat(styles.height), bottom: Number.parseFloat(styles.bottom) };
  });
  expect(geometry.height).toBeCloseTo(844 * 0.6, 0);
  expect(geometry.bottom).toBeCloseTo(844 * 0.22, 0);
  await expect(page.getByText(/Temporary character studies/)).toBeHidden();
  await expect(page.getByRole("button", { name: "Previous team figure" })).toHaveCSS("width", "48px");
});

test("contact details use the configured WhatsApp number and email", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/917026811812/);
  await expect(page.getByRole("link", { name: /Email/ })).toHaveAttribute("href", /^mailto:pratimaai@gmail\.com/);
});
