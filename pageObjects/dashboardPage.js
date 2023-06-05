class dashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cart = page.locator("text ='  Cart '");
    }

    async searchProducts(prodName) {
         //select product with name = 'iphone 13 pro'
        for (let i = 0; i < await this.products.count(); i++) {
            if (await this.products.nth(i).locator("b").textContent() == prodName) {
                await this.products.nth(i).locator("text = Add To Cart").click();
                break;
            }
        }
    }

    async navigateCart() {
        await this.cart.click();
    }
}

module.exports = {dashboardPage};