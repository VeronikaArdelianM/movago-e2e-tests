import { expect, type Locator, type Page } from '@playwright/test';
import { UserData } from '../data/testData';
import { BasePage } from './base';

export class AdminPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly forgotPassword: Locator;
    readonly signUpLink: Locator;
    readonly submitButton: Locator;
    readonly loginHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.forgotPassword = page.locator('a', { hasText: 'Забули пароль?' });
        this.signUpLink = page.locator('a', { hasText: 'Зареєструватися' });
        this.submitButton = page.locator('button[type="submit"]');
        this.loginHeader = page.locator('h2', { hasText: 'Увійти' });
    }

    async goto() {
        await this.adminHeaderButton.click();
        await this.page.waitForURL('/admin');
    }

    async changeUserStatus(user: UserData, status: 'Активний' | 'Неактивний' | 'Очікує підтвердження') {
        await this.page
            .locator('.user-card')
            .filter({ has: this.page.locator('p', { hasText: user.email }) })
            .locator('.action-button.edit')
            .click();
        await this.page
            .locator('.status-option')
            .filter({ has: this.page.locator('h5', { hasText: status }) })
            .click();
        await this.page.getByText('Зберегти').click();
        await this.page.locator('.save-button', { hasText: 'Активувати' }).click();
        await this.page.waitForResponse(response => response.status() === 200);
    }

    async checkUserStatus(user: UserData, status: 'Активний' | 'Неактивний' | 'Очікує підтвердження') {
        await expect(this.page
            .locator('.user-card')
            .filter({ has: this.page.locator('p', { hasText: user.email }) })
            .locator('.user-status')).toHaveText(status);
    }

}