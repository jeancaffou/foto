const { test, expect } = require("@playwright/test");

test("renders the complete portfolio structure without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Aerial & cave");
  await expect(page.locator(".work-card")).toHaveCount(8);
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator(".about__fact-icon")).toHaveCount(3);
  await expect(page.locator("#press")).toBeVisible();
  await expect(page.locator(".press-card")).toHaveCount(6);
  await expect(page.locator(".post-card")).toHaveCount(3);
  await expect(page.locator('a[href*="blog.kafol.net"]')).toHaveCount(0);

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(horizontalOverflow).toBe(false);

  const heroPanels = await page.locator(".hero__image").evaluateAll((panels) => panels.map((panel) => {
    const bounds = panel.getBoundingClientRect();
    return { left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom, width: bounds.width };
  }));
  expect(heroPanels[0].width).not.toBe(heroPanels[1].width);
  expect(heroPanels[0].right - heroPanels[1].left).toBeGreaterThan(30);
  expect(Math.abs(heroPanels[0].top - heroPanels[1].top)).toBeLessThan(1);
  expect(Math.abs(heroPanels[0].bottom - heroPanels[1].bottom)).toBeLessThan(1);

  await page.evaluate(() => document.fonts.ready);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible")));
  await page.locator("#top").scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);

  await page.screenshot({ path: testInfo.outputPath("page.png"), fullPage: true });
});

test("mobile navigation opens, links remain usable, and closes with Escape", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation only applies to the mobile project");
  await page.goto("/");

  const menu = page.locator(".menu-toggle");
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#site-nav")).toHaveClass(/is-open/);
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");

  await page.screenshot({ path: testInfo.outputPath("mobile-hero.png"), fullPage: false });
});
