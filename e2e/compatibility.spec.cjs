const { test: base, expect } = require('@playwright/test');
const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await use(page);
    await testInfo.attach('runtime-errors', { body: JSON.stringify(errors), contentType: 'application/json' });
    expect(errors, 'uncaught JavaScript exceptions').toEqual([]);
  },
});

const routes = ['/', '/service', '/community', '/experts', '/contacts', '/experts/more', '/community/more', '/experts/anton-volodin-upcoming', '/community/anton-volodin-upcoming', '/service/headshots'];

test('all routes load content and local images', async ({ page }, testInfo) => {
  test.setTimeout(60000);
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response.status(), route).toBe(200);
    await expect(page.locator('#root')).not.toBeEmpty();
    await expect(page.locator('img:visible').first()).toBeVisible();
    await expect.poll(() => page.locator('img').evaluateAll(images => images.filter(img => img.getBoundingClientRect().width > 0 && img.loading !== 'lazy').every(img => img.complete && img.naturalWidth > 0)), { message: `images on ${route}` }).toBe(true);
    if (['/', '/experts/anton-volodin-upcoming', '/service/headshots'].includes(route)) {
      await page.waitForTimeout(1000);
      await testInfo.attach(`screen-${route.replaceAll('/', '_') || 'home'}`, { body: await page.screenshot(), contentType: 'image/png' });
    }
  }
});

test('navigation opens service and contacts', async ({ page }) => {
  await page.goto('/');
  const mobile = page.viewportSize().width <= 1068;
  const pick = async title => {
    if (mobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('button', { name: title, exact: true }).click();
      await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
    } else await page.locator('.nav-item').filter({ hasText: new RegExp(`^${title}$`) }).click();
  };
  await pick('service');
  await expect(page).toHaveURL(/\/service$/);
  await expect(page.getByRole('link', { name: 'headshots video' })).toBeVisible();
  await pick('contacts');
  await expect(page).toHaveURL(/\/contacts$/);
  await expect(page.getByRole('heading', { name: 'we are here:' })).toBeVisible();
});

test('service pricing, form input and gallery boundaries', async ({ page }) => {
  await page.goto('/service/headshots');
  await page.getByRole('button', { name: 'headshot options' }).click();
  await page.getByRole('button', { name: 'quick shot 200$' }).click();
  await expect(page.getByText('30 min', { exact: true })).toBeVisible();
  const inputs = page.locator('input');
  for (let i = 0; i < 3; i++) {
    await inputs.nth(i).fill(['Test Person', '+123456789', 'Test project'][i]);
    await expect(inputs.nth(i)).toHaveValue(['Test Person', '+123456789', 'Test project'][i]);
  }
  if (page.viewportSize().width > 600) {
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Previous', exact: true })).toBeEnabled();
  } else {
    // Synthetic TouchEvents verify handlers, not native OS scrolling.
    const viewport = page.locator('[class*="PhotoSlider_viewport"]');
    await viewport.scrollIntoViewIfNeeded();
    for (let i = 0; i < 6; i++) {
      await viewport.dispatchEvent('touchstart', { touches: [{ identifier: 1, clientX: 300 }] });
      await viewport.dispatchEvent('touchend', { changedTouches: [{ identifier: 1, clientX: 30 }] });
    }
    await expect(page.locator('[class*="PhotoSlider_track"]')).toHaveAttribute('style', /translateX\(-600%\)/);
  }
});

test('expert slider advances and releases page scroll', async ({ page }, testInfo) => {
  await page.goto('/experts/anton-volodin-upcoming');
  const slider = page.getByRole('region', { name: 'Expert presentation' });
  const slides = slider.locator('[aria-hidden]');
  await expect(slides.nth(0)).toHaveAttribute('aria-hidden', 'false');
  for (let i = 1; i <= 2; i++) {
    if (testInfo.project.use.isMobile) {
      await slider.dispatchEvent('touchstart', { touches: [{ identifier: 1, clientY: 300 }] });
      await slider.dispatchEvent('touchmove', { touches: [{ identifier: 1, clientY: 50 }] });
      await slider.dispatchEvent('touchend', { changedTouches: [{ identifier: 1, clientY: 50 }] });
    } else await page.mouse.wheel(0, 150);
    await expect(slides.nth(i)).toHaveAttribute('aria-hidden', 'false');
    await page.waitForTimeout(750); // Product's transition lock is 700 ms.
  }
  if (testInfo.project.use.isMobile) {
    // Mobile WebKit has no mouse wheel API. Check event release separately
    // from programmatic scrolling; Chromium native touch has its own suite.
    expect(await slider.evaluate(el => {
      const event = new WheelEvent('wheel', { deltaY: 500, bubbles: true, cancelable: true });
      el.dispatchEvent(event);
      return event.defaultPrevented;
    })).toBe(false);
    await page.getByText('watch a video version:', { exact: true }).scrollIntoViewIfNeeded();
  } else await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => Math.max(window.scrollY, document.body.scrollTop))).toBeGreaterThan(0);
});

test('responsive pages do not overflow horizontally', async ({ page }, testInfo) => {
  test.setTimeout(60000);
  const measurements = [];
  for (const route of routes) {
    await page.goto(route);
    await page.waitForTimeout(850); // Wait for entrance transforms before measuring layout.
    measurements.push({ route, ...await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth })) });
  }
  await testInfo.attach('layout-measurements', { body: JSON.stringify(measurements, null, 2), contentType: 'application/json' });
  expect(measurements.filter(m => Math.max(m.documentWidth, m.bodyWidth) > m.width + 2)).toEqual([]);
});
