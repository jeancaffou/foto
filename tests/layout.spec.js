const { test, expect } = require("@playwright/test");

test("renders the complete portfolio structure without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Aerial & cave");
  await expect(page.locator(".work-card")).toHaveCount(8);
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator("#press")).toBeVisible();
  await expect(page.locator(".post-card")).toHaveCount(3);

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(horizontalOverflow).toBe(false);

  await page.evaluate(() => document.fonts.ready);
  const revealItems = page.locator("[data-reveal]");
  for (let index = 0; index < await revealItems.count(); index += 1) {
    await revealItems.nth(index).scrollIntoViewIfNeeded();
  }
  await expect(page.locator("[data-reveal]:not(.is-visible)")).toHaveCount(0);
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
