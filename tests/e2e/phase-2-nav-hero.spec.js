import { test, expect } from "@playwright/test";

test.describe("Phase 2 — Nav + Hero", () => {
  test("nav visible, logo rendered, 3 nav items present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('img[alt="Proovd"]')).toBeVisible();
    await expect(page.getByText("Features").first()).toBeVisible();
    await expect(page.getByText("Contact").first()).toBeVisible();
    await expect(page.getByText("Sign up").first()).toBeVisible();
  });

  test('"Sell out before the product exists" visible', async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Sell out before the product exists")
    ).toBeVisible();
  });

  test("H1 color is brand-lime rgb(188, 252, 161)", async ({ page }) => {
    await page.goto("/");
    const color = await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe("rgb(188, 252, 161)");
  });

  test("mobile viewport: hamburger visible, clicking opens overlay menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const hamburger = page.getByLabel("Open menu");
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    await expect(
      page.getByRole("dialog", { name: "Navigation menu" })
    ).toBeVisible();
  });

  test('Sign up href is "#" (env default)', async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Sign up").first()).toHaveAttribute("href", "#");
  });

  test("no console errors", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    expect(errors).toHaveLength(0);
  });
});
