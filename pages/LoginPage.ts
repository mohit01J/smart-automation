import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage — covers /login on the-internet.herokuapp.com
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput   = page.locator('#username');
    this.passwordInput   = page.locator('#password');
    this.loginButton     = page.locator('button[type="submit"]');
    this.flashMessage    = page.locator('#flash');
    this.logoutButton    = page.locator('a.button[href="/logout"]');
  }

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.usernameInput, username);
    await this.fillField(this.passwordInput, password);
    await this.waitAndClick(this.loginButton);
  }

  async logout(): Promise<void> {
    await this.waitAndClick(this.logoutButton);
  }
}
