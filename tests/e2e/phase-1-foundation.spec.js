import { test, expect } from "@playwright/test";

test.describe("Phase 1 — Foundation", () => {
  test("page returns 200", async ({ page }) => {
    const response = await page.goto("/");
    expect(response.status()).toBe(200);
  });

  test("page title contains 'Proovd'", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Proovd/);
  });

  test("h1 computed color is brand-lime rgb(188, 252, 161)", async ({ page }) => {
    await page.goto("/");
    const color = await page.locator("h1").evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe("rgb(188, 252, 161)");
  });

  test("body background is ink rgb(9, 17, 12)", async ({ page }) => {
    await page.goto("/");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(9, 17, 12)");
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
