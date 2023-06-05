const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');

test('PlaceOrder', async({page}) => {
    
    //setting email and password for login
    const email = "devgoel30@gmail.com";
    const password = "Codadvance@2";

    //creating  objects
    const poManager = new POManager(page);
    const myLogin = poManager.getLoginPage();
    const dash = poManager.getdashboardpage();
    const myCart = poManager.getcartPage();

    //****************** Login Page ******************************************** */

    //land on the given url
    await myLogin.goTo();

    //login 
    await myLogin.validLogin(email, password);

    //********************* DashBoard page ****************************************/
    
    //wait for page to be loaded
    await page.waitForLoadState('networkidle');

    //search for element and add to cart
    await dash.searchProducts("iphone 13 pro");

    //click on cart button
    await dash.navigateCart();

    //*********************** Cart Page ****************************************** */

    //check element present in cart and click checkout
    await myCart.clickCheckout();

    //******************* CheckOut Page *****************************/

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

    //click on place order
    await page.locator("a[class*='action__submit']").click();

    //********************* Orders Page ***************************************  */

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