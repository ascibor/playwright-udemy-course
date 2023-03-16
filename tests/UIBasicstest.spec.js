const {test, expect} = require('@playwright/test');

test('Opening browser', async ({page}) =>
{
    await page.goto("https://google.com");
    await console.log( await page.title());
    await expect(page).toHaveTitle("Google");
});

test('Sign in - incorrect credentials', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.title();
    //css selectors
    await page.locator('#username').type("rahulshetty");
    await page.locator("[type='password']").type("learning");
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
});


test('Sign in - valid credentials', async ({page}) => {
    const userName = page.locator('#username');
    const passwordField = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await passwordField.fill("learning");
    await signInBtn.click();
    await expect(page).toHaveTitle("ProtoCommerce");
    
    // selecting element by order
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});

test('Interacting with list elements', async ({page}) => {
    const userName = page.locator('#username')
    const password = page.locator("[type='password']")
    const submitBtn = page.locator('#signInBtn')
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await submitBtn.click();

// wait until no API call for at least 500ms, not useful in this case as this is not service based app
    await page.waitForLoadState('networkidle');

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});