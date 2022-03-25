import { test } from '@playwright/test';

test('index page should load', async ({ page }) => {
	await page.goto('/');
});
