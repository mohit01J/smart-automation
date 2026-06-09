import { test, expect, stepWithScreenshot } from "./fixtures";
import { CheckboxPage } from "../pages/CheckboxPage";
import { DropdownPage } from "../pages/DropdownPage";

test.describe("Checkboxes", () => {
  test("@smoke checkbox 1 can be checked", async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await stepWithScreenshot(page, "Open checkboxes page", async () => {
      await checkboxPage.goto();
    });

    const cb1 = await checkboxPage.getCheckbox(0);

    await stepWithScreenshot(page, "Check checkbox 1 if needed", async () => {
      if (!(await cb1.isChecked())) {
        await cb1.check();
      }
    });
    await stepWithScreenshot(page, "Verify checkbox 1 is checked", async () => {
      await expect(cb1).toBeChecked();
    });
  });

  test("@smoke checkbox 2 starts checked", async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await stepWithScreenshot(page, "Open checkboxes page", async () => {
      await checkboxPage.goto();
    });

    const cb2 = await checkboxPage.getCheckbox(1);
    await stepWithScreenshot(
      page,
      "Verify checkbox 2 starts checked",
      async () => {
        await expect(cb2).toBeChecked();
      },
    );
  });

  test("@regression checkbox 2 can be unchecked", async ({ page }) => {
    const checkboxPage = new CheckboxPage(page);
    await stepWithScreenshot(page, "Open checkboxes page", async () => {
      await checkboxPage.goto();
    });

    const cb2 = await checkboxPage.getCheckbox(1);
    await stepWithScreenshot(page, "Uncheck checkbox 2", async () => {
      await cb2.uncheck();
    });
    await stepWithScreenshot(
      page,
      "Verify checkbox 2 is unchecked",
      async () => {
        await expect(cb2).not.toBeChecked();
      },
    );
  });
});

test.describe("Dropdown", () => {
  test("@smoke can select option 1", async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await stepWithScreenshot(page, "Open dropdown page", async () => {
      await dropdownPage.goto();
    });

    await stepWithScreenshot(page, "Select dropdown option 1", async () => {
      await dropdownPage.selectOption("1");
    });
    await stepWithScreenshot(
      page,
      "Verify dropdown option 1 selected",
      async () => {
        expect(await dropdownPage.getSelectedValue()).toBe("1");
      },
    );
  });

  test("@smoke can select option 2", async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await stepWithScreenshot(page, "Open dropdown page", async () => {
      await dropdownPage.goto();
    });

    await stepWithScreenshot(page, "Select dropdown option 2", async () => {
      await dropdownPage.selectOption("2");
    });
    await stepWithScreenshot(
      page,
      "Verify dropdown option 2 selected",
      async () => {
        expect(await dropdownPage.getSelectedValue()).toBe("2");
      },
    );
  });

  test("@regression selecting different options updates value", async ({
    page,
  }) => {
    const dropdownPage = new DropdownPage(page);
    await stepWithScreenshot(page, "Open dropdown page", async () => {
      await dropdownPage.goto();
    });

    await stepWithScreenshot(page, "Select dropdown option 1", async () => {
      await dropdownPage.selectOption("1");
      expect(await dropdownPage.getSelectedValue()).toBe("1");
    });

    await stepWithScreenshot(page, "Select dropdown option 2", async () => {
      await dropdownPage.selectOption("2");
      expect(await dropdownPage.getSelectedValue()).toBe("2");
    });
  });
});
