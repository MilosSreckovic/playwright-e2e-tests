import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //launch url and assert title and header
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  //click on the appoitment 
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await expect(page.getByText('Please login to make')).toBeVisible();

  //login with valid credentials
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  //login assertions
  await expect(page.locator('h2')).toContainText('Make Appointment');
});