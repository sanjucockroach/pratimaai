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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Clear.Precise.Automated.");
  await expect(page.getByRole("link", { name: /Start on WhatsApp/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Email us/i }).first()).toBeVisible();
  await expect(page.getByText("Learn to see brilliantly.")).toBeVisible();
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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Three practices.Zero silos.");
  await expect(page.locator(".services-cinema__media source")).toHaveAttribute(
    "src",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
  );
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Purpose.Connected.");
  await expect(page.locator(".about-cinema source")).toHaveAttribute(
    "src",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4",
  );
});

test("contact details use the configured WhatsApp number and email", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa\.me\/917026811812/);
  await expect(page.getByRole("link", { name: /Email/ })).toHaveAttribute("href", /^mailto:pratimaai@gmail\.com/);
});
