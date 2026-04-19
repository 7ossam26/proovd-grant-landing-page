import { test, expect } from "@playwright/test";

const KEY = "proovd_consent_v1";

async function installUmamiStub(page) {
  await page.addInitScript(() => {
    window.__umamiEvents = [];
    window.umami = {
      track: (name, payload) => {
        window.__umamiEvents.push({ name, payload });
      },
    };
  });
}

test.describe("Phase 6 — consent + cookie banner", () => {
  test("cookie banner appears on first visit", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("cookie-banner")).toBeVisible();
  });

  test("accept hides banner and persists to localStorage", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("cookie-banner").getByRole("button", { name: "Accept" }).click();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    const v = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(v).toBe("accepted");
  });

  test("banner stays hidden on refresh after accept", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("cookie-banner").getByRole("button", { name: "Accept" }).click();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    await page.reload();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    const v = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(v).toBe("accepted");
  });

  test("decline hides banner and persists to localStorage", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("cookie-banner").getByRole("button", { name: "Decline" }).click();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    const v = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(v).toBe("declined");
  });

  test("banner stays hidden on refresh after decline", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("cookie-banner").getByRole("button", { name: "Decline" }).click();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    await page.reload();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    const v = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(v).toBe("declined");
  });
});

test.describe("Phase 6 — page loads clean without env vars", () => {
  test("no console errors when analytics env vars are unset", async ({ page }) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(String(err)));
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
    expect(errors).toHaveLength(0);
  });

  test("clarity script is not injected without consent", async ({ page }) => {
    await page.goto("/");
    const clarity = await page.evaluate(() => typeof window.clarity);
    expect(clarity).toBe("undefined");
  });
});

test.describe("Phase 6 — event wiring with umami mock", () => {
  test("cta_primary_click fires when Create account is clicked", async ({ page }) => {
    await installUmamiStub(page);
    await page.goto("/");
    const btn = page.getByRole("link", { name: "Create account" });
    await btn.evaluate((el) => el.setAttribute("href", "javascript:void(0)"));
    await btn.click();
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find((e) => e.name === "cta_primary_click");
    expect(match).toBeTruthy();
    expect(match.payload.location).toBe("cta_strip");
  });

  test("cta_secondary_click fires when Contact sales is clicked", async ({ page }) => {
    await installUmamiStub(page);
    await page.goto("/");
    const btn = page.getByRole("link", { name: "Contact sales" });
    await btn.evaluate((el) => el.setAttribute("href", "javascript:void(0)"));
    await btn.click();
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find((e) => e.name === "cta_secondary_click");
    expect(match).toBeTruthy();
    expect(match.payload.location).toBe("cta_strip");
  });

  test("nav_click fires when nav Features link is clicked", async ({ page }) => {
    await installUmamiStub(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Features" }).first().click();
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find((e) => e.name === "nav_click");
    expect(match).toBeTruthy();
    expect(match.payload.target).toBe("features");
  });

  test("footer_link_click fires when a footer link is clicked", async ({ page }) => {
    await installUmamiStub(page);
    await page.goto("/");
    await page.locator("footer").getByText("For Founders").click();
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find((e) => e.name === "footer_link_click");
    expect(match).toBeTruthy();
    expect(match.payload.column).toBe("Platform");
    expect(match.payload.label).toBe("For Founders");
  });

  test("section_scroll_reached fires for sections as they enter view", async ({ page }) => {
    await installUmamiStub(page);
    await page.goto("/");
    const ids = ["features-pitch", "features-match", "features-proof", "how-it-works", "contact"];
    for (const id of ids) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
    }
    const events = await page.evaluate(() => window.__umamiEvents);
    const sectionEvents = events.filter((e) => e.name === "section_scroll_reached");
    expect(sectionEvents.length).toBeGreaterThanOrEqual(3);
  });

  test("page_exit_scroll_depth fires on pagehide", async ({ page }) => {
    await installUmamiStub(page);
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
    // Wait for AnalyticsLifecycle's useEffect to register the pagehide listener
    await page.waitForFunction(() => window.__umamiEvents !== undefined);
    await page.waitForTimeout(300);
    await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find((e) => e.name === "page_exit_scroll_depth");
    expect(match).toBeTruthy();
    expect(typeof match.payload.percent).toBe("number");
  });
});
