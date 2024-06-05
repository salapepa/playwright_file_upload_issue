import { test, expect } from '@playwright/test';

test('has title', async ({ page,browser }) => {
  const context = await browser.newContext();
  const newPage = await context.newPage();
  const givAccess = newPage.getByText('Give access to camera and mic');
  await page.goto('https://doxy.me/signin');
  await page.getByPlaceholder("Email").fill("Test12345@doxy.me");
  await page.getByPlaceholder("Password").fill("Test12345@doxy.me");
  await page.getByRole("button",{ name: 'Sign In'}).click();
  await expect(page).toHaveURL(/dashboard/);
  await newPage.goto('https://doxy.me/myroom12345');
  await newPage.getByPlaceholder("Enter your full name").fill("Patient");
  await newPage.keyboard.press('Enter');
  await newPage.waitForTimeout(3000);
  await newPage.getByRole("button",{ name: 'Check In'}).click();
  
  await newPage.waitForTimeout(3000);
  await page.getByText('Patient').hover({ force: true });
  await page.getByRole("button",{ name: 'Start Call'}).click();
  await page.pause();
  await newPage.pause();
});

