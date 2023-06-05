class loginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("#login");
    }

    async validLogin (username, password) {
        //enter username
        await this.userEmail.fill(username);

        //enter password
        await this.password.fill(password);

        //click login
        await this.signInButton.click();
    }

    async goTo () {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}

module.exports = {loginPage};