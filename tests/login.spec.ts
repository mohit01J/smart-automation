import { test, expect, stepWithScreenshot } from "./fixtures";
import { LoginPage } from "../pages/LoginPage";

/**
 * Login tests against https://the-internet.herokuapp.com/login
 * Valid creds: tomsmith / SuperSecretPassword!
 */

test.describe("Login", () => {
  test("@smoke valid login succeeds", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await stepWithScreenshot(page, "Open login page", async () => {
      await loginPage.goto();
    });

    await stepWithScreenshot(page, "Submit valid login", async () => {
      await loginPage.login("tomsmith", "SuperSecretPassword!");
    });

    await stepWithScreenshot(page, "Verify secure area", async () => {
      await loginPage.assertURL("/secure");
      await loginPage.assertVisible(loginPage.flashMessage);
      await loginPage.assertText(
        loginPage.flashMessage,
        "You logged into a secure area!",
      );
    });
  });

  test("@smoke invalid password shows error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await stepWithScreenshot(page, "Open login page", async () => {
      await loginPage.goto();
    });

    await stepWithScreenshot(page, "Submit invalid password", async () => {
      await loginPage.login("tomsmith", "wrongpassword");
    });

    await stepWithScreenshot(
      page,
      "Verify invalid password message",
      async () => {
        await loginPage.assertVisible(loginPage.flashMessage);
        await loginPage.assertText(
          loginPage.flashMessage,
          "Your password is invalid!",
        );
      },
    );
  });

  test("@regression invalid username shows error", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await stepWithScreenshot(page, "Open login page", async () => {
      await loginPage.goto();
    });

    await stepWithScreenshot(page, "Submit invalid username", async () => {
      await loginPage.login("unknownuser", "SuperSecretPassword!");
    });

    await stepWithScreenshot(
      page,
      "Verify invalid username message",
      async () => {
        await loginPage.assertVisible(loginPage.flashMessage);
        await loginPage.assertText(
          loginPage.flashMessage,
          "Your username is invalid!",
        );
      },
    );
  });

  test("@regression login then logout returns to login page", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await stepWithScreenshot(page, "Open login page", async () => {
      await loginPage.goto();
    });

    await stepWithScreenshot(page, "Submit valid login", async () => {
      await loginPage.login("tomsmith", "SuperSecretPassword!");
      await loginPage.assertURL("/secure");
    });

    await stepWithScreenshot(
      page,
      "Logout and verify return to login",
      async () => {
        await loginPage.logout();
        await loginPage.assertURL("/login");
        await loginPage.assertText(
          loginPage.flashMessage,
          "You logged out of the secure area!",
        );
      },
    );
  });
});
