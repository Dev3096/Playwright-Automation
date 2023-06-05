const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'serial'}); //run all test in serial mode (if first test fail then all other tests will be skipped)
//test.describe.configure({mode:'parallel'}); // run tests in parallel within this file
test('First Playwright test',async ({page})=> {
    //playwright code
    // every step is concatinated with await 
    // async - aynchronus (must if using await)
    // brower - global fixture
    // if in {} then only it is evaluated for automation (playwright fixture) and can be used
    // const context = await browser.newContext(); // start new instance with some predefined properties - prepare a new browser
    // const page = (await context).newPage(); // await is added to wait for a new browser context to be opened
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    // get title
    console.log(await page.title());

    //check if its correct - assertitions
    //await expect(page).toHaveTitle("Google");
    const cartTitles = page.locator(".card-title a");
    // send username (using CSS)
    
    await page.locator('#username').type("rahulshetty");
    await page.locator("[name='password']").type("learning");
    await page.locator("#signInBtn").click();
    let myStr = await page.locator("[style *= 'block']").textContent();
    console.log(myStr);
    await expect(await page.locator("[style *= 'block']")).toContainText('Incorrect');
    //await expect(await page.locator("[style *= 'block']")).toContainText('Icorrect');

    await page.locator('#username').fill("");
    await page.locator('#username').fill("rahulshettyacademy");
    await Promise.all (
        [
            page.waitForNavigation(),
            page.locator("#signInBtn").click()
            //page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop'),
            
            
        ]
    );

    //await page.waitForLoadState('networkidle'); // wait until everyting is loaded and the network becomes idle
    // this is only solution for network based application 

    //await page.locator("#signInBtn").click();
    let elements = await cartTitles.allTextContents(); // this method will not wait hence blank list is displayed
    console.log(elements);
    
});

test('UI Controls', async ({page}) => {
    const blinkText = page.locator('.blinkingText');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[name='password']").type("learning");

    //dropdown
    const dropDown = page.locator('select.form-control');
    await dropDown.selectOption('consult');

    //radio
    await page.locator('.radiotextsty').last().click();

    //select okay popup
    await page.locator('#okayBtn').click();

    //check if user radio is checked
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    console.log(await page.locator('.radiotextsty').last().isChecked());

    // click checkbox
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();

    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    //expect(await page.locator('#terms').isChecked()).toBeTruthy();

    //check blinking text
    await expect(blinkText).toHaveAttribute('class','blinkingText');

    //await page.pause();
});

test('Window handles', async({browser}) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const password = await page.locator("[name='password']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkText = page.locator('.blinkingText');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkText.click(),
    ])

    const text = await newPage.locator('.red').textContent();
    
    //get userId from the text
    const getText = text.split("@");
    const user = getText[1].split(" ")[0];
    console.log(user);

    // use the above username in the login page
    await userName.fill(user);
    await page.pause();
});

test('PlaceOrder', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/client");

    //enter username
    await page.locator("#userEmail").fill("devgoel30@gmail.com");

    //enter password
    await page.locator("#userPassword").fill("Codadvance@2");

    //click login
    await page.locator("#login").click();
    
    //wait for page to be loaded
    await page.waitForLoadState('networkidle');

    // get all elements present 
    const elements = await page.locator(".card-body");

    console.log(await elements.count());

    //select product with name = 'Zara Coat 3'
    for (let i = 0; i < await elements.count(); i++) {
        //console.log(i);
        //console.log(await elements.nth(i).textContent());
        if (await elements.nth(i).locator("b").textContent() == "iphone 13 pro") {
            await elements.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }

    //click on cart button
    await page.locator("text ='  Cart '").click();

    //wait for page to be loaded
    await page.locator("div li").first().waitFor(); // wait for first element to be loaded

    //check if element is visible or not
    const visi = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); //pseudo classes (tagName:has-text(''))
    await expect(visi).toBeTruthy();

    //click on checkout
    await page.locator("button:has-text('Checkout')").click();

    // wait for elements to be loaded
    await page.locator("div input").first().waitFor();

    // enter credit card number
    await page.locator("input[value='4542 9931 9292 2293']").fill("1234 4567 1234 4567");

    //enter expiration date
    const firstSelect = await page.locator("select[class='input ddl']:first-of-type");
    await firstSelect.selectOption("04");

    //enter CVV code
    //await page.locator("div:has-text('CVV Code ')").locator(".input").fill("123");
    await page.locator("input[type='text']").nth(1).fill('123');

    //enter name on card
    await page.locator("input[type='text']").nth(2).fill('Dev');

    //enter coupon
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");

    //click on apply coupon
    await page.locator("button[type='submit']").click();

    //verify if the coupon is applied or not
    const applied = await page.locator("p[style='color: green;']")
    console.log(await applied.textContent());
    await expect(applied).toContainText("* Coupon Applied");

    

    //dynamic dropdown
    await page.locator("input[placeholder*='Select']").type('ind',{delay:100}); //type slowly
    // wait for the dropdown to apear
    const options = page.locator(".ta-results");
    await options.waitFor();

    // get all the options in the dropdown
    const list = await options.locator("button");
    console.log(await list.count());

    //select india from the dropdown
    for (let i = 0; i < await list.count(); i++) {
        //console.log(i);
        if(await list.nth(i).textContent() == " India") {
            await list.nth(i).click();
        }
    }

    //validate email id
    //await expect (page.locator("input[type='text']").nth(4)).toHaveText("devgoel30@gmail.com");
    //await page.locator("input[type='text']").nth(4).fill("Hello");
    //console.log(await page.locator("input[type='text']").nth(4)).textContent();
    //await expect (page.locator("input[type='text']").nth(4)).toHaveText("devgoel30@gmail.com");
    
    //await expect(mail).toHaveText("devgoel30@gmail.co");

    //click on place order
    await page.locator("a[class*='action__submit']").click();

    // verify order placed
    await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //get order id
    let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    let newOrder = orderId.split(" ")[2];
    console.log(newOrder);

    //click on orders tab
    await page.locator("button[routerlink*='/dashboard/myorders']").click();

    //wait for elements to be located
    await page.locator("th[scope='row']").first().waitFor(); 

    //get all orders
    const allOrders = await page.locator("tr[class='ng-star-inserted']");
    console.log(await allOrders.count());
    for (let i = 0; i < await allOrders.count(); i++) {
        //console.log(await allOrders.nth(i).textContent());
        if (await allOrders.nth(i).locator("th[scope='row']").textContent() == newOrder) {
            await allOrders.nth(i).locator(".btn-primary").click();
        }
    }
    

    await page.pause();
});

