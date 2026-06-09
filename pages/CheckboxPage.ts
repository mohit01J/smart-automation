import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckboxPage — covers /checkboxes on the-internet.herokuapp.com
 */
export class CheckboxPage extends BasePage {
  readonly checkboxes: Locator;

  constructor(page: Page) {
    super(page);
    this.checkboxes = page.locator('#checkboxes input[type="checkbox"]');
  }

  async goto(): Promise<void> {
    await this.navigate('/checkboxes');
  }

  async getCheckbox(index: number): Promise<Locator> {
    return this.checkboxes.nth(index);
  }

  async isChecked(index: number): Promise<boolean> {
    return (await this.getCheckbox(index)).isChecked();
  }
}
