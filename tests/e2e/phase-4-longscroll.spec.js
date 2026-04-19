import { test, expect } from "@playwright/test";

test.describe("Phase 4 — LongScroll Ecosystem Section", () => {
  test("section renders with id how-it-works", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#how-it-works")).toBeVisible();
  });

  test("all 5 headings are visible with exact copy", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Ramble at us. We'll handle the pitch.")
    ).toBeVisible();
    await expect(
      page.getByText("Every pledge comes with a reason.")
    ).toBeVisible();
    await expect(
      page.getByText("72 hours to know if creators want in")
    ).toBeVisible();
    await expect(
      page.getByText("Your friends lied. backers don't.")
    ).toBeVisible();
    await expect(
      page.getByText("Show the shape. Keep the secret.")
    ).toBeVisible();
  });

  test("envelope placeholder is present", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#how-it-works");
    // The first aria-hidden div in the section is the envelope placeholder
    const envelope = section.locator("[aria-hidden='true']").first();
    await expect(envelope).toBeVisible();
  });

  test("5 ecosystem illustration SVGs are present", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#how-it-works");
    const svgs = section.locator("svg");
    await expect(svgs).toHaveCount(5);
  });

  test("mobile 375px: illustrations appear above text in each block", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const section = page.locator("#how-it-works");
    const headings = section.locator("h3");
    const svgs = section.locator("svg");

    // For each block, the svg bounding box should be above the heading
    const count = await headings.count();
    for (let i = 0; i < count; i++) {
      const svgBox = await svgs.nth(i).boundingBox();
      const headingBox = await headings.nth(i).boundingBox();
      expect(svgBox.y).toBeLessThan(headingBox.y);
    }
  });

  test("hover on illustration does not throw", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    const firstSvg = page.locator("#how-it-works svg").first();
    await firstSvg.hover();
    expect(errors).toHaveLength(0);
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
