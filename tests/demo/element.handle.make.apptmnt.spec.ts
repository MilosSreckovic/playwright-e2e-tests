import { test, expect } from "@playwright/test";

test.describe("Should make Appointment", () => {

  test.beforeEach("Should login successfully with valid credentials",async ({ page }) => {
    //launch url and assert title and header
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //click on make appointment button
    //imena svakog elementa na tastaturi mozemo naci online
    await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    //await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    //await page.getByRole("link", { name: "Make Appointment" }).click({button : "right"});
    //await page.getByRole("link", { name: "Make Appointment" }).hover();
    //await page.getByRole("link", { name: "Make Appointment" }).click({timeout : 10_000});
    await expect(page.getByText("Please login to make")).toBeVisible();

    //successful login with valid credentials
    await page.getByLabel("Username").clear();
    await page.getByLabel("Username").fill("John Doe");
    //usporeno pisanje
    //await page.getByLabel("Username").pressSequentially("John Doe", {delay:300});

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //assert if the text is correct
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Should make an appointment with non default values", async ({ page }) => {
    //asercija za default vrednost
    await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center",);
    //dropdown
    await page.getByLabel("Facility").selectOption("Seoul CURA Healthcare Center");

    //select by label or index
    await page.getByLabel("Facility").selectOption({ label: "Seoul CURA Healthcare Center" });
    await page.getByLabel("Facility").selectOption({ index: 1 });
    //postoje jos i opcije kao sto su assert the count ili get all dropdown values

    //checkbox
    await page.getByText("Apply for hospital readmission").click();

    //asercija za default vrednost
    await expect(page.getByText("Medicare")).toBeChecked();
    //odliklktanje
    await expect(page.getByText("Medicare")).not.toBeChecked();
    //radiobox kliktanje na drugu vrednost
    await page.getByText("Medicaid").click();


    //date picker
    await page.locator("span").click();
    await page.getByRole("cell", { name: "30" }).nth(1).click();

    //multiline text box
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a codegen practice\nin multiple lines");

    //button
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //assertions
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.getByRole("link", { name: "Go to Homepage" }),).toBeVisible();
  });
});
