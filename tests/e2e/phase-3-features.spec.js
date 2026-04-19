import { test, expect } from "@playwright/test";

test.describe("Phase 3 — Feature Panels", () => {
  test("three sections render in order with correct ids", async ({ page }) => {
    await page.goto("/");
    const pitch = page.locator("#features-pitch");
    const match = page.locator("#features-match");
    const proof = page.locator("#features-proof");
    await expect(pitch).toBeVisible();
    await expect(match).toBeVisible();
    await expect(proof).toBeVisible();

    // verify DOM order: pitch before match before proof
    const pitchBox = await pitch.boundingBox();
    const matchBox = await match.boundingBox();
    const proofBox = await proof.boundingBox();
    expect(pitchBox.y).toBeLessThan(matchBox.y);
    expect(matchBox.y).toBeLessThan(proofBox.y);
  });

  test("each headline is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Pitch your idea in ten minutes.")
    ).toBeVisible();
    await expect(
      page.getByText("Get matched with creators in 72 hours.")
    ).toBeVisible();
    await expect(page.getByText("People pledge. You get proof.")).toBeVisible();
  });

  test('each Try Now button has href "#" (env default)', async ({ page }) => {
    await page.goto("/");
    const buttons = page.getByRole("link", { name: "Try Now" });
    await expect(buttons).toHaveCount(3);
    for (const btn of await buttons.all()) {
      await expect(btn).toHaveAttribute("href", "#");
    }
  });

  test('clicking nav "Features" scrolls to #features-pitch', async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Features" }).first().click();
    await page.waitForTimeout(500);
    const section = page.locator("#features-pitch");
    await expect(section).toBeInViewport();
  });

  test("mobile viewport: columns stack, image above text", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // image placeholder should appear before the content in each section
    const pitchSection = page.locator("#features-pitch");
    const pitchImage = pitchSection.locator("[aria-hidden='true']").first();
    const pitchHeading = pitchSection.locator("h2");

    const imageBox = await pitchImage.boundingBox();
    const headingBox = await pitchHeading.boundingBox();
    expect(imageBox.y).toBeLessThan(headingBox.y);
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
