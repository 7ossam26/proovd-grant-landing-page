import { test, expect } from "@playwright/test";

test.describe("Phase 5 — CTA Strip + Footer", () => {
  test("CTA strip headline 'Start shipping today.' is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Start shipping today.")).toBeVisible();
  });

  test("'Create account' button has correct href (env default '#')", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Create account" })).toHaveAttribute("href", "#");
  });

  test("'Contact sales' button has correct href (env default '#')", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Contact sales" })).toHaveAttribute("href", "#");
  });

  test("footer renders 4 columns with correct titles", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("Platform")).toBeVisible();
    await expect(footer.getByText("Legal")).toBeVisible();
    await expect(footer.getByText("Resources")).toBeVisible();
    await expect(footer.getByText("Company")).toBeVisible();
  });

  test("Platform column links all render", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("For Founders")).toBeVisible();
    await expect(footer.getByText("For Affiliates")).toBeVisible();
    await expect(footer.getByText("How It Works")).toBeVisible();
    await expect(footer.getByText("Pricing")).toBeVisible();
    await expect(footer.getByText("Success Stories")).toBeVisible();
  });

  test("Legal column links all render", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("Terms of Service")).toBeVisible();
    await expect(footer.getByText("Privacy Policy")).toBeVisible();
    await expect(footer.getByText("IP Protection Policy")).toBeVisible();
    await expect(footer.getByText("Backer Disclaimer")).toBeVisible();
    await expect(footer.getByText("Cookie Settings")).toBeVisible();
  });

  test("Resources column links all render", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("Pitch Guide")).toBeVisible();
    await expect(footer.getByText("Playbook")).toBeVisible();
    await expect(footer.getByText("Affiliate Toolkit")).toBeVisible();
    await expect(footer.getByText("Blog")).toBeVisible();
    await expect(footer.getByText("FAQ")).toBeVisible();
  });

  test("Company column links all render", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("About")).toBeVisible();
    await expect(footer.getByText("Careers")).toBeVisible();
    await expect(footer.getByText("Press")).toBeVisible();
  });

  test("footer copyright text is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer").getByText("© 2026 Proovd. All rights reserved.")).toBeVisible();
  });

  test("nav 'Contact' link href points to #contact", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Contact" }).first()).toHaveAttribute("href", "#contact");
  });

  test("#contact anchor scrolls into view when nav Contact is clicked", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Contact" }).first().click();
    const ctaStrip = page.locator("#contact");
    await expect(ctaStrip).toBeVisible();
  });

  test("mobile 375px: footer shows all 4 column titles stacked", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("Platform")).toBeVisible();
    await expect(footer.getByText("Legal")).toBeVisible();
    await expect(footer.getByText("Resources")).toBeVisible();
    await expect(footer.getByText("Company")).toBeVisible();
  });

  test("mobile 375px: CTA buttons stack vertically", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const createBtn = page.getByRole("link", { name: "Create account" });
    const contactBtn = page.getByRole("link", { name: "Contact sales" });
    await expect(createBtn).toBeVisible();
    await expect(contactBtn).toBeVisible();
    const createBox = await createBtn.boundingBox();
    const contactBox = await contactBtn.boundingBox();
    // On mobile, Create account should be above Contact sales (stacked vertically)
    expect(createBox.y).toBeLessThan(contactBox.y);
  });

  test("variant='mint' appears exactly once in the page (Create account only)", async ({ page }) => {
    await page.goto("/");
    // The mint button has bg-brand-primary — count elements with that class
    const mintButtons = page.locator(".bg-brand-primary");
    await expect(mintButtons).toHaveCount(1);
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
