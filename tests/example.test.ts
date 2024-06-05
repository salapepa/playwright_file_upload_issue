import { test, expect } from "@playwright/test";

test("has title", async ({ page, browser }) => {
  await page.goto("https://doxy.me/signin");
  await page.getByPlaceholder("Email").fill("Test12345@doxy.me");
  await page.getByPlaceholder("Password").fill("Test12345@doxy.me");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/dashboard/);

  const context = await browser.newContext();
  const newPage = await context.newPage();
  const givAccess = newPage.getByText("Give access to camera and mic");
  await newPage.goto("https://doxy.me/myroom12345");
  await newPage.waitForTimeout(1000);
  await newPage.getByPlaceholder("Enter your full name").fill("TestPatient");
  await newPage.waitForTimeout(1000);
  await newPage.keyboard.press("Enter");
  // await newPage.getByRole("button",{ name: 'Check In'}).click();
  await page
    .getByLabel("Start video call")
    .getByText("TestPatient")
    .hover({ force: true });
  await page.getByRole("button", { name: "Start Call" }).click({ force: true });
  // waiting for call started
  await page.waitForTimeout(10000);

  await page.getByTestId('call-control-bar').getByRole('button', { name: 'Options' }).click();
  await page.getByLabel('File transfer').click();

  await page.getByRole('button', {name: 'Request TestPatient to share files'}).click();

  await newPage.locator('input[type="file"]').setInputFiles('./worrior.png');

  console.log('file uploaded');
  // await page.locator('input[type="file"]').setInputFiles('./worrior.png');
  // await expect(page.getByRole('dialog').locator('div', { hasText: 'worrior.png'}).first()).toBeVisible();
});
