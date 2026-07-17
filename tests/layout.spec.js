const { test, expect } = require("@playwright/test");

test("renders the complete portfolio structure without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Aerial & cave");
  await expect(page.locator(".work-card")).toHaveCount(8);
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator(".about__fact-icon")).toHaveCount(3);
  await expect(page.locator("#press")).toBeVisible();
  await expect(page.locator(".press-card")).toHaveCount(14);
  await expect(page.locator('.press-card[href*="rtvslo.si"][href*="/689184"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href*="rtvslo.si"][href*="/691924"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href*="delo.si"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href*="radio94.si"]')).toHaveCount(3);
  await expect(page.locator('.press-card[href*="/objava/910480"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href*="702287"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href*="/objava/919103"]')).toHaveCount(1);
  await expect(page.locator(".feature-card")).toHaveCount(3);
  await expect(page.locator(".post-card")).toHaveCount(3);
  await expect(page.locator('a[href*="blog.kafol.net"]')).toHaveCount(0);
  await expect(page.locator('.work-card[href^="/work/"]')).toHaveCount(8);

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

test("paginates the complete press archive without dropping entries", async ({ page }) => {
  await page.goto("/");
  await page.locator("#press").scrollIntoViewIfNeeded();

  await expect(page.locator("[data-press-pager]")).toBeVisible();
  await expect(page.locator("[data-press-total]")).toHaveText("04");
  await expect(page.locator(".press-card:visible")).toHaveCount(4);
  await expect(page.locator("[data-press-prev]")).toBeDisabled();
  await expect(page.locator('.press-card[href*="delo.si"]')).toBeHidden();

  await page.locator("[data-press-next]").click();
  await expect(page.locator("[data-press-page]")).toHaveText("02");
  await expect(page.locator('.press-card[href*="delo.si"]')).toBeVisible();
  await expect(page.locator('.press-card[href*="/689184"]')).toBeVisible();
  await expect(page.locator(".press-card:visible")).toHaveCount(4);

  await page.locator("[data-press-next]").click();
  await page.locator("[data-press-next]").click();
  await expect(page.locator("[data-press-page]")).toHaveText("04");
  await expect(page.locator(".press-card:visible")).toHaveCount(2);
  await expect(page.locator("[data-press-next]")).toBeDisabled();
});

test("renders category galleries and opens the local-image lightbox", async ({ page }, testInfo) => {
  await page.goto("/work/from-above/");

  await expect(page.locator("h1")).toHaveText("From Above");
  await expect(page.locator(".gallery-tile")).toHaveCount(37);
  await expect(page.locator('.gallery-categories a[aria-current="page"]')).toHaveText("From Above");
  await expect(page.locator('a[href*="blog.kafol.net"]')).toHaveCount(0);

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(horizontalOverflow).toBe(false);

  const firstTile = page.locator(".gallery-tile").first();
  await firstTile.click();
  await expect(page.locator("[data-lightbox]")).toBeVisible();
  await expect(page.locator("[data-lightbox-image]")).toHaveAttribute("src", /\/assets\/images\/featured\/full\//);
  await page.locator("[data-lightbox-close]").click();
  await expect(page.locator("[data-lightbox]")).not.toBeVisible();

  await page.screenshot({ path: testInfo.outputPath("gallery.png"), fullPage: false });
});

test("headshot loads cleanly and restores color on hover-capable screens", async ({ page }, testInfo) => {
  await page.goto("/");
  const portrait = page.locator(".about__portrait img");
  await portrait.scrollIntoViewIfNeeded();
  await expect.poll(() => portrait.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(portrait).toHaveCSS("filter", "grayscale(1)");
  if (testInfo.project.name === "mobile") return;
  await expect(page.locator(".about__portrait")).toHaveClass(/is-visible/);
  await page.waitForTimeout(750);
  await portrait.hover();
  await expect(portrait).toHaveCSS("filter", "grayscale(0)");
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
