import { test, expect, stepWithScreenshot } from "./fixtures";

/**
 * Tests for dynamic content pages — alerts, dynamic loading, drag-and-drop.
 * All on https://the-internet.herokuapp.com
 */

test.describe("Alerts", () => {
  test("@smoke JS alert can be accepted", async ({ page }) => {
    await stepWithScreenshot(page, "Open JavaScript alerts page", async () => {
      await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

    await stepWithScreenshot(page, "Trigger and accept JS alert", async () => {
      page.once("dialog", (dialog) => dialog.accept());
      await page.locator("button", { hasText: "Click for JS Alert" }).click();
    });

    await stepWithScreenshot(page, "Verify JS alert result", async () => {
      await expect(page.locator("#result")).toContainText(
        "You successfully clicked an alert",
      );
    });
  });

  test("@regression JS confirm can be accepted", async ({ page }) => {
    await stepWithScreenshot(page, "Open JavaScript alerts page", async () => {
      await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

    await stepWithScreenshot(
      page,
      "Trigger and accept JS confirm",
      async () => {
        page.once("dialog", (dialog) => dialog.accept());
        await page
          .locator("button", { hasText: "Click for JS Confirm" })
          .click();
      },
    );

    await stepWithScreenshot(
      page,
      "Verify JS confirm accepted result",
      async () => {
        await expect(page.locator("#result")).toContainText("You clicked: Ok");
      },
    );
  });

  test("@regression JS confirm can be dismissed", async ({ page }) => {
    await stepWithScreenshot(page, "Open JavaScript alerts page", async () => {
      await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    });

    await stepWithScreenshot(
      page,
      "Trigger and dismiss JS confirm",
      async () => {
        page.once("dialog", (dialog) => dialog.dismiss());
        await page
          .locator("button", { hasText: "Click for JS Confirm" })
          .click();
      },
    );

    await stepWithScreenshot(
      page,
      "Verify JS confirm dismissed result",
      async () => {
        await expect(page.locator("#result")).toContainText(
          "You clicked: Cancel",
        );
      },
    );
  });
});

test.describe("Dynamic Loading", () => {
  test("@smoke element hidden initially reveals after start", async ({
    page,
  }) => {
    await stepWithScreenshot(
      page,
      "Open dynamic loading example 1",
      async () => {
        await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
      },
    );

    await stepWithScreenshot(
      page,
      "Start dynamic loading example 1",
      async () => {
        await page.locator("button", { hasText: "Start" }).click();
      },
    );

    await stepWithScreenshot(
      page,
      "Verify dynamic loading example 1 result",
      async () => {
        await expect(page.locator("#loading")).toBeHidden({ timeout: 10_000 });
        await expect(page.locator("#finish")).toBeVisible();
        await expect(page.locator("#finish")).toContainText("Hello World!");
      },
    );
  });

  test("@regression element rendered after start is visible", async ({
    page,
  }) => {
    await stepWithScreenshot(
      page,
      "Open dynamic loading example 2",
      async () => {
        await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
      },
    );

    await stepWithScreenshot(
      page,
      "Start dynamic loading example 2",
      async () => {
        await page.locator("button", { hasText: "Start" }).click();
      },
    );

    await stepWithScreenshot(
      page,
      "Verify dynamic loading example 2 result",
      async () => {
        await expect(page.locator("#loading")).toBeHidden({ timeout: 10_000 });
        await expect(page.locator("#finish")).toBeVisible();
        await expect(page.locator("#finish")).toContainText("Hello World!");
      },
    );
  });
});

test.describe("Inputs", () => {
  test("@smoke number input accepts numeric value", async ({ page }) => {
    await stepWithScreenshot(page, "Open inputs page", async () => {
      await page.goto("https://the-internet.herokuapp.com/inputs");
    });

    const input = page.locator('input[type="number"]');
    await stepWithScreenshot(page, "Enter numeric input", async () => {
      await input.fill("42");
    });
    await stepWithScreenshot(page, "Verify numeric input value", async () => {
      await expect(input).toHaveValue("42");
    });
  });
});
