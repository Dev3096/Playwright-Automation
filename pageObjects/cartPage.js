class cartPage {
    constructor(page) {
        this.page = page;
        this.wait = page.locator("div li");
        this.element = page.locator("h3:has-text('iphone 13 pro')");
        this.checkOut = page.locator("button:has-text('Checkout')");
    }

    async clickCheckout() {
        await this.wait.first().waitFor();
        await this.element.isVisible();
        await this.checkOut.click();
    }

}

module.exports = {cartPage};