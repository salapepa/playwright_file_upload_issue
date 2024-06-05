import { test, expect } from '@playwright/test';
test('has title', async ({ page,browser }) => {
  await page.goto('https://doxy.me/signin');
  await page.getByPlaceholder("Email").fill("Test12345@doxy.me");
  await page.getByPlaceholder("Password").fill("Test12345@doxy.me");
  await page.getByRole("button",{ name: 'Sign In'}).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.locator('.icon-settings').click();
  await page.getByRole("button",{ name: 'Expand'}).first().click();
  await page.locator('.personal-info-profile-pic').click();
  await page.getByRole("button",{ name: 'Upload photo'}).click();

  await page.pause();
});