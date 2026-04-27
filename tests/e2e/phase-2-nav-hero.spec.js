import { test, expect } from "@playwright/test";

test.describe("Phase 2 — Nav + Hero", () => {
  test("nav visible, logo rendered, 3 nav items present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav[aria-label="Main"]')).toBeVisible();
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

  test("hero phone videos render without decorative frames", async ({ page }) => {
    await page.goto("/");
    const frames = await page.locator("#hero video").evaluateAll((videos) =>
      videos.map((video) => {
        const wrapper = video.parentElement;
        const styles = getComputedStyle(wrapper);
        return {
          borderTopWidth: styles.borderTopWidth,
          borderRadius: styles.borderTopLeftRadius,
          overflow: styles.overflow,
        };
      })
    );

    expect(frames.length).toBeGreaterThan(0);
    for (const frame of frames) {
      expect(frame.borderTopWidth).toBe("0px");
      expect(frame.borderRadius).toBe("0px");
      expect(frame.overflow).toBe("visible");
    }
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

  test("mobile hero matches portrait menu and single pledge stack", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Open menu" })).toHaveText(
      "Menu"
    );

    const mediaBox = await page.locator("#hero > div").first().boundingBox();
    expect(mediaBox.width / mediaBox.height).toBeCloseTo(393 / 710, 2);

    await expect(page.locator('[data-testid="mobile-pledge-stack"]')).toBeVisible();
    await expect(page.locator('[data-testid="desktop-pledge-layer"]')).toBeHidden();
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
