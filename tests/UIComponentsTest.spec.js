const {test, expect} = require('@playwright/test');

test('Selecting elements of dropdown list', async({page}) => {
    const dropdown = page.locator('select.form-control');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropdown.selectOption("Consultant");
   // below command will pause code execution and open playwright inspector
    //await page.pause();
});


test('Selecting radio buttons', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
});

test('Clicking on radio button', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect ( await page.locator("#terms").isChecked()).toBeFalsy();
});

test('Verify if text is blinking', async({page}) => {
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});