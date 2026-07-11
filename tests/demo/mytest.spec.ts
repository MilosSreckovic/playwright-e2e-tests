import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  // 1. go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // 2. assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // 3. assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", async ({ page }) => {
  //steps...
  await page.locator("//h1").click();
});

test.only("Should do demo locators", async ({ page }) => {

  //launch url and assert title and header
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //click on the appoitment
  let makeApmmtBtn = page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();

  await page.getByRole('heading', { name: 'We Care About Your Health' }).click();
});
