import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — shared helpers inherited by all Page Objects.
 * Wraps Playwright actions with logging and sensible defaults.
 */
export class BasePage {
  readonly page: Page;
  readonly baseURL = 'https://the-internet.herokuapp.com';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async waitAndClick(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillField(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async assertText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text);
  }

  async assertURL(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(path));
  }
}
