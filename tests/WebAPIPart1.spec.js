const {test, expect, request} = require('@playwright/test');
const {apiUtils} = require ('./utils/apiUtils');
const payLoad = {userEmail:"devgoel30@gmail.com",userPassword:"Codadvance@2"};
const createOrderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let response;

test.beforeAll(async() => {
    // login API
    const apiContext = await request.newContext();
    const ApiUtils = new apiUtils(apiContext,payLoad);
    response = await ApiUtils.createOrder(createOrderPayLoad);

});

test.beforeEach(async() => {

});

test('PlaceOrderAPI', async({page}) => {
    
    //add token to bypass login part using API call
    page.addInitScript(value => {
        window.localStorage.setItem('token',value)
    },response.token );

    await page.goto("https://rahulshettyacademy.com/client");

    //click on orders tab
    await page.locator("button[routerlink*='/dashboard/myorders']").click();

    //wait for elements to be located
    await page.locator("th[scope='row']").first().waitFor(); 

    //get all orders
    const allOrders = await page.locator("tr[class='ng-star-inserted']");
    console.log(await allOrders.count());
    for (let i = 0; i < await allOrders.count(); i++) {
        //console.log(await allOrders.nth(i).textContent());
        if (await allOrders.nth(i).locator("th[scope='row']").textContent() == response.orderID) {
            await allOrders.nth(i).locator(".btn-primary").click();
        }
    }
    

    await page.pause();
});