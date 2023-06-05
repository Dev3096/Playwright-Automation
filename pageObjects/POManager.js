const {loginPage} = require('./loginPage');
const {cartPage} =  require('./cartPage');
const {dashboardPage} = require('./dashboardPage');
class POManager {
    constructor(page) {
        this.page = page;
        this.myLogin = new loginPage(page);
        this.dash = new dashboardPage(page);
        this.myCart = new cartPage(page);
    }

    getLoginPage() {
        return this.myLogin;
    }

    getcartPage() {
        return this.myCart;
    }

    getdashboardpage() {
        return this.dash;
    }
}

module.exports = {POManager};