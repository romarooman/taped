const { test, expect } = require('@playwright/test');

async function swipe(page, start, end) {
  const session = await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: start.x, y: start.y }] });
  for (let i = 1; i <= 10; i++) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start.x + (end.x-start.x)*i/10, y: start.y + (end.y-start.y)*i/10 }] });
    await page.waitForTimeout(25);
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await session.detach();
}

test('browser touch input advances expert slides before scrolling document', async ({ page }) => {
  await page.goto('/experts/anton-volodin-upcoming');
  const slides=page.getByRole('region',{name:'Expert presentation'}).locator('[aria-hidden]');
  await expect(slides.nth(0)).toHaveAttribute('aria-hidden','false');
  await swipe(page,{x:180,y:600},{x:180,y:200});
  await expect(slides.nth(1)).toHaveAttribute('aria-hidden','false');
});

test('browser touch input scrolls FAQ without changing the active page', async ({ page }) => {
  await page.goto('/service');
  // One vertical swipe advances from services to FAQ.
  await swipe(page,{x:180,y:600},{x:180,y:200});
  await expect(page.getByRole('heading',{name:'q& a'})).toBeVisible();
  await page.waitForTimeout(900);
  const list=page.locator('[data-inner-scroll="true"]');
  const box=await list.boundingBox();
  expect(box).not.toBeNull();
  const dimensions=await list.evaluate(el=>({height:el.clientHeight,scroll:el.scrollHeight}));
  expect(dimensions.scroll).toBeGreaterThan(dimensions.height);
  await swipe(page,{x:box.x+box.width/2,y:Math.min(box.y+box.height-20,750)},{x:box.x+box.width/2,y:box.y+30});
  await expect(page.getByRole('heading',{name:'q& a'})).toBeVisible();
  await expect.poll(()=>list.evaluate(el=>el.scrollTop)).toBeGreaterThan(0);
});
