import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
test('File chooser on Prod', async ({ page,browser }) => {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.goto('https://doxy.me/signin');
  await page.getByPlaceholder("Email").fill("Test12345@doxy.me");
  await page.getByPlaceholder("Password").fill("Test12345@doxy.me");
  await page.getByRole("button",{ name: 'Sign In'}).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.locator('.icon-settings').click();
  await page.getByRole("button",{ name: 'Expand'}).first().click();
  await page.locator('.personal-info-profile-pic').click();
  await page.getByRole("button",{ name: 'Upload photo'}).click();
  const fileChooser = await fileChooserPromise;
      const absolutePath = resolve(
        process.cwd(),
        'tests/jpg.jpg',
      );

      await fileChooser.setFiles(absolutePath);
      await page.getByRole('button', {
        name: 'Set as profile photo',
      }).click();

      await expect(page.locator('.personal-info-profile-pic[style*=".s3.amazonaws.com"]')).toBeVisible();
});

test('File chooser on QA', async ({ page,browser }) => {
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.goto('https://doxy-qa2.me/signin');
  await page.getByPlaceholder("Email").fill("Test12345@doxy.me");
  await page.getByPlaceholder("Password").fill("Test12345@doxy.me");
  await page.getByRole("button",{ name: 'Sign In'}).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.locator('.icon-settings').click();
  await page.getByRole("button",{ name: 'Expand'}).first().click();
  await page.locator('.personal-info-profile-pic').click();
  await page.getByRole("button",{ name: 'Upload photo'}).click();
  const fileChooser = await fileChooserPromise;
      const absolutePath = resolve(
        process.cwd(),
        'tests/jpg.jpg',
      );

      await fileChooser.setFiles(absolutePath);
      await page.getByRole('button', {
        name: 'Set as profile photo',
      }).click();

      await expect(page.locator('.personal-info-profile-pic[style*=".s3.amazonaws.com"]')).toBeVisible();
});