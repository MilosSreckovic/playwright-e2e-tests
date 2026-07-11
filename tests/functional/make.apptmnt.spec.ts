import { test, expect } from "@playwright/test";
import {log} from "../helpers/logger.js"

test.describe("Should make Appointment", () => {


  test.beforeEach("Should login successfully with valid credentials",async ({ page }) => { 

      //launch url and assert title and header
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

      await log ("log", 'Launching the web app');

      //click on make appointment button
      //imena svakog elementa na tastaturi mozemo naci online
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();

      //successful login with valid credentials
      await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
      await page.getByLabel("Password").fill(process.env.PASSWORD);
      await page.getByRole("button", { name: "Login" }).click();

      //assert if the text is correct
      await expect(page.locator("h2")).toContainText("Make Appointment");
    },
  );

  test("Should make an appointment with non default values", async ({ page }) => {
    //dropdown
    await page.getByLabel("Facility").selectOption("Seoul CURA Healthcare Center");

    //checkboc
    await page.getByText("Apply for hospital readmission").click();

    //radiobox
    await page.getByText("Medicaid").click();

    //date picker
    await page.locator("span").click();
    await page.getByRole("cell", { name: "30" }).nth(1).click();

    //multiline text box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("This is a codegen practice\nin multiple lines");

    //button
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //assertation
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.getByRole("link", { name: "Go to Homepage" }),).toBeVisible();

    await log ("error", 'The page did not launch');
  });
});
