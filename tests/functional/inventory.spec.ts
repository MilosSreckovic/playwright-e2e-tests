import{test, expect } from '@playwright/test'

test.describe("Inventory feature", () =>{

    test.beforeEach("Login with valid credential", async ({ page }) => {
    //launch site
      await page.goto("https://www.saucedemo.com/");

      //login
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();

      //expecting a page to have a url 
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      await expect(page).toHaveURL(/.*\/inventory/);
    });

    test("Should confirm all prices are non-zero values", async ({ page }) => {
      let productsElements = page.locator(".inventory_item");
      await expect(productsElements).toHaveCount(6);

      let totalProducts = await productsElements.count();

      for (let i = 0; i < totalProducts; i++) {
        const productPrice = await productsElements.nth(i).locator(".inventory_item_price").innerText();
        expect(parseFloat(productPrice.replace("$", ""))).toBeGreaterThan(0);
      }
    });
    
});