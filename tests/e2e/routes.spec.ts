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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI, SOFTWARE AND LEARNING");
  await expect(page.getByRole("link", { name: "START ON WHATSAPP" })).toBeVisible();
  await expect(page.getByRole("link", { name: "EMAIL US" })).toBeVisible();
});

test("navigation reaches every public route", async ({ page }) => {
  await page.goto("/");
  for (const name of ["Services", "Work", "About", "Contact"] as const) {
    await page.getByRole("link", { name, exact: true }).first().click();
    await expect(page).toHaveURL(new RegExp(`/${name.toLowerCase()}$`));
  }
});

test("contact details remain honest until launch configuration is supplied", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByText("Public contact details have not yet been supplied.", { exact: false })).toBeVisible();
  await expect(page.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", "/contact#contact-details");
});
