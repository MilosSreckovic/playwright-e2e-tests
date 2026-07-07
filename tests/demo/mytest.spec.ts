import {test, expect} from '@playwright/test';

test("Should load home page with correct title", async ({ page }) => {
    // 1. go to home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // 2. assert if the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // 3. assert header text
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});