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

//Handling Child windows & Tabs with Playwright by switching browser context 

test('New tab handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

   const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    const text = await newPage.locator(".red").textContent();
    console.log(text);
    //Extracting value from the string
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    //coming back to the previous page and entering value from the other Tab
    await page.locator("#username").type(domain);
    await page.pause();
    console.log(await page.locator("#username").textContent());

});