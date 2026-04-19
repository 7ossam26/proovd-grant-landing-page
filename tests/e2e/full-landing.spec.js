import { test, expect, devices } from "@playwright/test";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 375, height: 667 },
};

const HEADLINES = [
  "Sell out before the product exists",
  "Pitch your idea in ten minutes.",
  "Get matched with creators in 72 hours.",
  "People pledge. You get proof.",
  "Ramble at us. We'll handle the pitch.",
  "Start shipping today.",
];

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

async function acceptCookies(page) {
  await page.addInitScript((k) => {
    localStorage.setItem(k, "accepted");
  }, KEY);
}

for (const [label, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`Phase 7 full landing — ${label}`, () => {
    test.use({ viewport });

    test("page loads 200", async ({ page }) => {
      const response = await page.goto("/");
      expect(response.status()).toBe(200);
    });

    test("renders all 6 section headlines", async ({ page }) => {
      await acceptCookies(page);
      await page.goto("/");
      for (const text of HEADLINES) {
        await expect(
          page.getByRole("heading", { name: text, exact: false }).first(),
        ).toBeVisible();
      }
    });

    test("exactly one h1 on the page", async ({ page }) => {
      await acceptCookies(page);
      await page.goto("/");
      const count = await page.locator("h1").count();
      expect(count).toBe(1);
    });

    test("no console errors on load", async ({ page }) => {
      const errors = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(String(e)));
      await acceptCookies(page);
      await page.goto("/");
      await expect(page.locator("main")).toBeVisible();
      expect(errors).toEqual([]);
    });

    test("no network 404s on load", async ({ page }) => {
      const fails = [];
      page.on("response", (r) => {
        if (r.status() === 404) fails.push(r.url());
      });
      await acceptCookies(page);
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      expect(fails).toEqual([]);
    });

    test("all images have non-empty alt", async ({ page }) => {
      await acceptCookies(page);
      await page.goto("/");
      const imgs = page.locator("img");
      const count = await imgs.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const alt = await imgs.nth(i).getAttribute("alt");
        expect(alt, `img[${i}] missing alt`).not.toBeNull();
        expect(alt.length, `img[${i}] empty alt`).toBeGreaterThan(0);
      }
    });

    test("skip-link becomes visible on focus and targets #main", async ({ page }) => {
      await acceptCookies(page);
      await page.goto("/");
      const link = page.getByRole("link", { name: "Skip to content" });
      await link.focus();
      await expect(link).toBeVisible();
      expect(await link.getAttribute("href")).toBe("#main");
    });
  });
}

test.describe("Phase 7 — desktop nav anchors", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("clicking Features scrolls to features-pitch", async ({ page }) => {
    await acceptCookies(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Features" }).first().click();
    await page.waitForTimeout(500);
    const top = await page
      .locator("#features-pitch")
      .evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(top)).toBeLessThan(200);
  });

  test("clicking Contact scrolls to contact section", async ({ page }) => {
    await acceptCookies(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Contact" }).first().click();
    await page.waitForTimeout(500);
    const top = await page
      .locator("#contact")
      .evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(top)).toBeLessThan(200);
  });
});

test.describe("Phase 7 — mobile hamburger", () => {
  test.use({ viewport: VIEWPORTS.mobile });

  test("hamburger opens overlay, link closes it", async ({ page }) => {
    await acceptCookies(page);
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(dialog).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Close menu" }).first(),
    ).toHaveAttribute("aria-expanded", "true");

    await dialog.getByRole("link", { name: "Features" }).click();
    await expect(dialog).toBeHidden();
  });
});

test.describe("Phase 7 — cookie banner lifecycle", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("appears then accept hides + persists across refresh", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByTestId("cookie-banner");
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Accept" }).click();
    await expect(banner).toHaveCount(0);
    await page.reload();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    const v = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(v).toBe("accepted");
  });

  test("decline hides + persists across refresh", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByTestId("cookie-banner");
    await expect(banner).toBeVisible();
    await banner.getByRole("button", { name: "Decline" }).click();
    await expect(banner).toHaveCount(0);
    await page.reload();
    await expect(page.getByTestId("cookie-banner")).toHaveCount(0);
    const v = await page.evaluate((k) => localStorage.getItem(k), KEY);
    expect(v).toBe("declined");
  });
});

test.describe("Phase 7 — analytics events", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("nav_click fires with target=features", async ({ page }) => {
    await installUmamiStub(page);
    await acceptCookies(page);
    await page.goto("/");
    await page.getByRole("link", { name: "Features" }).first().click();
    const events = await page.evaluate(() => window.__umamiEvents);
    expect(events.some((e) => e.name === "nav_click" && e.payload.target === "features")).toBe(true);
  });

  test("cta_primary_click fires on Create account", async ({ page }) => {
    await installUmamiStub(page);
    await acceptCookies(page);
    await page.goto("/");
    const btn = page.getByRole("link", { name: "Create account" });
    await btn.evaluate((el) => el.setAttribute("href", "javascript:void(0)"));
    await btn.click();
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find(
      (e) => e.name === "cta_primary_click" && e.payload.location === "cta_strip",
    );
    expect(match).toBeTruthy();
  });

  test("cta_secondary_click fires on Contact sales", async ({ page }) => {
    await installUmamiStub(page);
    await acceptCookies(page);
    await page.goto("/");
    const btn = page.getByRole("link", { name: "Contact sales" });
    await btn.evaluate((el) => el.setAttribute("href", "javascript:void(0)"));
    await btn.click();
    const events = await page.evaluate(() => window.__umamiEvents);
    const match = events.find(
      (e) => e.name === "cta_secondary_click" && e.payload.location === "cta_strip",
    );
    expect(match).toBeTruthy();
  });

  test("section_scroll_reached fires for multiple sections", async ({ page }) => {
    await installUmamiStub(page);
    await acceptCookies(page);
    await page.goto("/");
    for (const id of [
      "features-pitch",
      "features-match",
      "features-proof",
      "how-it-works",
      "contact",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
    }
    const events = await page.evaluate(() => window.__umamiEvents);
    const reached = events.filter((e) => e.name === "section_scroll_reached");
    expect(reached.length).toBeGreaterThanOrEqual(3);
  });
});

test.describe("Phase 7 — keyboard navigation", () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test("Tab sequence reaches the primary interactive elements", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Tab order verified in chromium");
    await acceptCookies(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const seen = new Set();
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const desc = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const label =
          el.getAttribute("aria-label") ||
          (el.textContent || "").trim().slice(0, 60);
        return `${el.tagName}:${label}`;
      });
      if (desc) seen.add(desc);
    }

    // Skip-link + logo + at least one nav link + at least one CTA.
    expect([...seen].some((s) => s.includes("Skip to content"))).toBe(true);
    expect([...seen].some((s) => s.toUpperCase().includes("A:") || s.toUpperCase().includes("BUTTON:"))).toBe(true);
    expect(seen.size).toBeGreaterThan(4);
  });
});
