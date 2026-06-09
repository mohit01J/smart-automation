import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DropdownPage — covers /dropdown on the-internet.herokuapp.com
 */
export class DropdownPage extends BasePage {
  readonly dropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.dropdown = page.locator('#dropdown');
  }

  async goto(): Promise<void> {
    await this.navigate('/dropdown');
  }

  async selectOption(value: string): Promise<void> {
    await this.dropdown.selectOption(value);
  }

  async getSelectedValue(): Promise<string> {
    return this.dropdown.inputValue();
  }
}
