const {test, expect} = require('@playwright/test');

test('@Web More tests', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // navigation
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    //take element screenshot
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    
    // verify if the element is displayed
    expect(await page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    

    expect(await page.locator("#displayed-text")).toBeHidden();

    //alerts
    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.accept());

    //mouse hover
    await page.locator("#mousehover").hover();

    // take page screenshot
    await page.screenshot({path: 'screenshot.png'});

    //compare 2 screenshots
    expect (await 'partialScreenshot.png').toMatchSnapshot('screenshot.png');
    
    await page.pause();

});
