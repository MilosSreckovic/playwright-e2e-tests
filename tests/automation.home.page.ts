import BasePage from "./page-objects/basepage";
import { expect, type Page } from "@playwright/test";
import { log } from "./helpers/logger";

class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* Elements */
  get nameInputBox() {
    return this.page.getByRole("textbox", { name: "Name" });
  }

  get emailInputBox() {
    return this.page
      .locator("form")
      .filter({ hasText: "Signup" })
      .getByPlaceholder("Email Address");
  }

  get signupBtn() {
    return this.page.getByRole("button", { name: "Signup" });
  }

  /* Page Actions */
  async signupToAutomationExercise(url: string, name: string) {
    const email = `milos${Date.now()}@gmail.com`;

    try {
      await log("info", `Signup to: ${url} with name: ${name}`);

      await this.navigateTo(url);

      await this.typeInto(this.nameInputBox, name);

      await this.typeInto(this.emailInputBox, email);

      await this.click(this.signupBtn);

      await expect(this.page).toHaveURL(
        "https://automationexercise.com/signup",
      );

      await log(
        "info",
        `Signup page opened successfully with email: ${email}`,
      );
    } catch (err) {
      (err as Error).message =
        `Failed signup to Automation Exercise: ${url}, ` +
        `with name: ${name}, email: ${email}`;

      throw err;
    }
  }
}

export default HomePage;