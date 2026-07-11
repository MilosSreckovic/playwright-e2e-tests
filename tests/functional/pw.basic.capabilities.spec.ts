import { test, expect } from "@playwright/test";

test.describe("Make Appointment", 
  {annotation: {type:"Story", description:"JIRA 1234: Make appointment feature"}}, () => {

  test.beforeEach(
    "Should login successfully with valid credentials", async ({ page }, testInfo) => {
      //launch url and assert title and header
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

      //click on make appointment button
      //imena svakog elementa na tastaturi mozemo naci online
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();

      //successful login with valid credentials
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();

      //random screentshot unutar testa
      let fullPageScreenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach("Login page", {body: fullPageScreenshot, contentType: "image/png",});

      //assert if the text is correct
      await expect(page.locator("h2")).toContainText("Make Appointment");
    },
  );

  test("Should make an appointment with non default values", 
    {annotation: {type:"Bug", description: "Defect - 1234 Does not work in the firefox"}, 
      tag :"@smoke"}, async ({ page }) => {
    //dropdown
    await page.getByLabel("Facility").selectOption("Seoul CURA Healthcare Center");

    //checkbox
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

    //assertio
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.getByRole("link", { name: "Go to Homepage" }),).toBeVisible();
  });
});
