const { test, expect } = require("@playwright/test");

test("renders the complete portfolio structure without horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Aerial & cave");
  await expect(page.locator(".work-card")).toHaveCount(8);
  await expect(page.locator("#about")).toBeVisible();
  await expect(page.locator(".about__fact-icon")).toHaveCount(3);
  await expect(page.locator("#press")).toBeVisible();
  await expect(page.locator(".press-card")).toHaveCount(14);
  await expect(page.locator('.press-card[href="/press/ce-si-amater-se-ne-pomeni-da-si-slab/"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href="/press/da-si-lahko-zares-ustvarjalen/"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href="/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href^="/"]')).toHaveCount(14);
  await expect(page.locator('.press-card[href^="http"]')).toHaveCount(0);
  await expect(page.locator('.press-card[href="/featured/mayors-award-postojna-2024/"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href="/press/prepih-na-obisku-zan-kafol/"]')).toHaveCount(1);
  await expect(page.locator('.press-card[href="/press/zan-kafol-od-zgoraj-od-blizu/"]')).toHaveCount(1);
  await expect(page.locator('.feature-card[href^="/"]')).toHaveCount(3);
  await expect(page.locator(".feature-card")).toHaveCount(3);
  await expect(page.locator(".publication-mark img")).toHaveCount(6);
  await expect(page.locator(".ambassador-mark img")).toHaveAttribute("alt", "Visit Postojnsko");
  await expect(page.locator(".about__copy")).not.toContainText("Tourist ambassador");
  await expect(page.locator(".ambassador-mark")).toContainText("Tourist ambassador for Visit Postojnsko (Tourism Postojna)");
  await expect(page.locator('.work-card[href="/work/water-and-ice/"] img')).toHaveAttribute("src", /20231105-DJI_0307-Pano/);
  await expect(page.locator(".work-card__type").filter({ hasText: /^\d+ photographs$/ })).toHaveCount(0);
  await expect(page.locator(".feature-card--postojna")).toContainText("Mayor's Award, Postojna, 2024");
  await expect(page.locator(".feature-card--postojna")).toContainText("Special achievements in photography and promotion of the Municipality of Postojna, Slovenia");
  await expect(page.locator(".feature-card").nth(1)).toHaveClass(/feature-card--postojna/);
  await expect(page.locator(".feature-card").nth(2)).toHaveClass(/feature-card--nikon/);
  await expect(page.locator('.press-card[href="/featured/mayors-award-postojna-2024/"]')).toContainText("Županovo priznanje za fotografijo");
  await expect(page.locator(".about__facts")).toContainText("Karst Research Institute");
  await expect(page.locator(".hero__intro")).toContainText("Photo stories shaped by flight");
  await expect(page.locator(".post-card")).toHaveCount(3);
  await expect(page.locator('a[href*="blog.kafol.net"]')).toHaveCount(0);
  await expect(page.locator('.work-card[href^="/work/"]')).toHaveCount(8);
  await expect(page.locator('.work-card[href*="#"]')).toHaveCount(0);
  await expect(page.locator('.work-card[href^="/work/land-and-life/"]')).toHaveCount(1);
  await expect(page.locator('.work-card[href*="wild-places"]')).toHaveCount(0);
  await expect(page.locator('.work-card[href^="/work/award-winning/"]').nth(1)).toContainText("Enlightened (All Roads Lead to Rakov Škocjan)");
  await expect(page.locator(".feature-card--natgeo")).toContainText("Enlightened (All Roads Lead to Rakov Škocjan)");
  await expect(page.getByText("Illumination", { exact: true })).toHaveCount(0);

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

  const alignedLeftEdges = await page.locator(".works, .about__inner, .featured").evaluateAll((items) => items.map((item) => item.getBoundingClientRect().left));
  expect(Math.max(...alignedLeftEdges) - Math.min(...alignedLeftEdges)).toBeLessThan(0.1);
  const alignedRightEdges = await page.locator(".works, .about__inner, .press").evaluateAll((items) => items.map((item) => item.getBoundingClientRect().right));
  expect(Math.max(...alignedRightEdges) - Math.min(...alignedRightEdges)).toBeLessThan(0.1);

  await page.evaluate(() => document.fonts.ready);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible")));
  await page.locator("#top").scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);

  await page.screenshot({ path: testInfo.outputPath("page.png"), fullPage: true });
});

test("aligns visible homepage bands to the max-width shell", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Max-width shell geometry only needs one desktop run");
  await page.setViewportSize({ width: 2100, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible")));

  const leftSelectors = [
    ".works > .section-label",
    ".work-grid",
    ".about__portrait",
    ".featured > .section-label",
    ".feature-grid",
    ".publication-list",
    ".ambassador-mark",
    ".journal__heading",
    ".site-footer__inner"
  ];
  const leftEdges = await Promise.all(leftSelectors.map((selector) => page.locator(selector).evaluate((item) => item.getBoundingClientRect().left)));
  expect(Math.max(...leftEdges) - Math.min(...leftEdges)).toBeLessThan(0.1);

  const shell = await page.locator(".works").evaluate((item) => {
    const bounds = item.getBoundingClientRect();
    return { left: bounds.left, right: bounds.right };
  });
  expect(shell.left).toBeCloseTo(280, 1);
  expect(shell.right).toBeCloseTo(1820, 1);
});

test("paginates the complete press archive without dropping entries", async ({ page }) => {
  await page.goto("/");
  await page.locator("#press").scrollIntoViewIfNeeded();

  await expect(page.locator("[data-press-pager]")).toBeVisible();
  await expect(page.locator("[data-press-total]")).toHaveText("03");
  await expect(page.locator(".press-card:visible")).toHaveCount(6);
  await expect(page.locator("[data-press-prev]")).toBeDisabled();
  await expect(page.locator('.press-card[href="/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/"]')).toBeHidden();

  await page.locator("[data-press-next]").click();
  await expect(page.locator("[data-press-page]")).toHaveText("02");
  await expect(page.locator('.press-card[href="/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/"]')).toBeVisible();
  await expect(page.locator('.press-card[href*="zanu-kafolu-se-je"]')).toBeVisible();
  await expect(page.locator(".press-card:visible")).toHaveCount(6);

  await page.locator("[data-press-next]").click();
  await expect(page.locator("[data-press-page]")).toHaveText("03");
  await expect(page.locator(".press-card:visible")).toHaveCount(2);
  await expect(page.locator("[data-press-next]")).toBeDisabled();
});

test("renders category galleries and opens the local-image lightbox", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.locator(".work-card").first().click();
  await expect(page).toHaveURL(/\/work\/award-winning\/$/);
  await expect(page.locator(".gallery-tile")).toHaveCount(2);

  await page.goto("/work/from-above/");

  await expect(page.locator("h1")).toHaveText("From Above");
  await expect(page.locator(".gallery-tile")).toHaveCount(11);
  await expect(page.locator('.gallery-categories a[aria-current="page"]')).toHaveText("From Above");
  await expect(page.locator('a[href*="blog.kafol.net"]')).toHaveCount(0);

  const galleryHeroEdges = await page.locator(".gallery-hero, .gallery-hero__shade, .gallery-categories").evaluateAll((items) => items.map((item) => {
    const bounds = item.getBoundingClientRect();
    return { top: bounds.top, bottom: bounds.bottom };
  }));
  expect(Math.abs(galleryHeroEdges[0].bottom - galleryHeroEdges[1].bottom)).toBeLessThan(0.1);
  expect(Math.abs(galleryHeroEdges[0].bottom - galleryHeroEdges[2].top)).toBeLessThan(0.1);
  await expect(page.locator(".gallery-hero")).toHaveCSS("border-bottom-width", "0px");

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

test("renders local press archive pages with publisher links and readable scans", async ({ page }) => {
  await page.goto("/press/ce-se-hoces-umakniti-gres-gor-ali-pa-dol/");
  await expect(page.locator("h1")).toHaveText("Če se hočeš umakniti, greš gor ali pa dol");
  await expect(page.locator(".press-detail__meta")).toContainText("neDelo");
  await expect(page.locator(".press-detail__meta")).toContainText("October 21, 2023");
  await expect(page.locator(".press-detail__source")).toHaveAttribute("href", "https://www.delo.si/nedelo/ce-se-hoces-umakniti-gres-gor-ali-pa-dol");
  await expect(page.locator('.press-detail__scan img[src="/assets/images/press-nedelo.jpg"]')).toBeVisible();

  await page.goto("/press/zan-kafol-od-zgoraj-od-blizu/");
  await expect(page.locator("h1")).toHaveText("Žan Kafol: od zgoraj, od blizu");
  await expect(page.locator(".press-detail__meta")).toContainText("November 2022");
  await expect(page.locator(".press-detail__meta")).toContainText("Issue 134, page 20");
  await expect(page.locator(".press-detail__source")).toHaveAttribute("href", /Prepih%20November%2021c-11-22%20WEB\.pdf$/);
  await expect(page.locator('.press-detail__scan img[src="/assets/images/press-prepih-2022-article.jpg"]')).toBeVisible();

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(horizontalOverflow).toBe(false);
});

test("renders local video, award, and Nikon landing pages", async ({ page }) => {
  await page.goto("/press/fotografija-postojne-iz-zraka-in-pod-zemljo/");
  await expect(page.locator("h1")).toHaveText("Fotografija Postojne iz zraka in pod zemljo");
  await expect(page.locator('.press-detail__video iframe')).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/TYeM4MJ5kCQ");
  await expect(page.locator('.press-detail__source[href*="youtube.com/watch?v=TYeM4MJ5kCQ"]')).toBeVisible();

  await page.goto("/featured/mayors-award-postojna-2024/");
  await expect(page.locator("h1")).toHaveText("Mayor's Award, Postojna, 2024");
  await expect(page.locator(".press-detail__summary")).toContainText("promotion of the Municipality of Postojna");
  await expect(page.locator('img[src="/assets/images/feature-mayors-award-postojna-2024.jpg"]')).toBeVisible();

  await page.goto("/featured/i-am-nikon-jaz-sem-raketa/");
  await expect(page.locator("h1")).toHaveText("I AM Nikon — Jaz sem Raketa");
  await expect(page.locator(".press-detail__meta")).toContainText("Second place, 2010");
  await expect(page.locator(".press-detail__gallery img")).toHaveCount(2);
  await expect(page.locator(".press-detail__gallery figcaption").first()).toContainText("I Am a Rocket");

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(horizontalOverflow).toBe(false);
});

test("renders the migrated journal archive and canonical post pages", async ({ page }, testInfo) => {
  await page.goto("/blog/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toContainText("Photo stories from");
  await expect(page.locator(".blog-card")).toHaveCount(11);
  await expect(page.locator('.blog-pagination a[href="/blog/page/2/"]')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("journal-archive.png"), fullPage: true });

  await page.goto("/blog/page/18/");
  await expect(page.locator(".blog-card")).toHaveCount(7);
  await expect(page.locator(".blog-pagination")).toContainText("Page 18 / 18");

  await page.goto("/2023/10/druga-zmaga-na-national-geographic.html");
  await expect(page.locator("html")).toHaveAttribute("lang", "sl");
  await expect(page.locator("h1")).toHaveText("Druga zmaga na National Geographic");
  await expect(page.locator(".post-copy")).toBeVisible();
  expect(await page.locator(".tiled-gallery__item").count()).toBeGreaterThan(0);

  await page.locator('.post-copy img[role="button"]').first().click();
  await expect(page.locator(".post-lightbox")).toBeVisible();
  await page.locator(".post-lightbox__close").click();
  await expect(page.locator(".post-lightbox")).not.toBeVisible();

  const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(horizontalOverflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("journal-post.png"), fullPage: true });
});

test("headshot loads cleanly and restores color on hover-capable screens", async ({ page }, testInfo) => {
  await page.goto("/");
  const portrait = page.locator(".about__portrait img");
  await portrait.scrollIntoViewIfNeeded();
  await expect.poll(() => portrait.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(portrait).toBeVisible();
  expect((await portrait.boundingBox()).height).toBeGreaterThan(100);
  await expect(portrait).toHaveCSS("filter", "grayscale(1)");
  if (testInfo.project.name === "mobile") return;
  await expect(page.locator(".about__portrait")).toHaveClass(/is-visible/);
  await page.waitForTimeout(750);
  const frameBefore = await page.locator(".about__portrait").evaluate((frame) => {
    const bounds = frame.getBoundingClientRect();
    return { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height };
  });
  if ((await page.viewportSize()).width > 900) {
    const imageBefore = await portrait.evaluate((image) => {
      const bounds = image.getBoundingClientRect();
      return { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height };
    });
    expect(Math.abs(imageBefore.left - frameBefore.left)).toBeLessThan(1);
    expect(Math.abs(imageBefore.top - frameBefore.top)).toBeLessThan(1);
    expect(Math.abs(imageBefore.width - frameBefore.width)).toBeLessThan(1);
    expect(Math.abs(imageBefore.height - frameBefore.height)).toBeLessThan(1);
  }
  await portrait.hover();
  await expect(portrait).toHaveCSS("filter", "grayscale(0)");
  const transform = await portrait.evaluate((image) => getComputedStyle(image).transform);
  expect(transform).not.toBe("none");
  const frameAfter = await page.locator(".about__portrait").evaluate((frame) => {
    const bounds = frame.getBoundingClientRect();
    return { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height };
  });
  expect(frameAfter).toEqual(frameBefore);
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
