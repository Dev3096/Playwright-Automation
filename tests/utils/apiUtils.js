class apiUtils {

    constructor(apiContext,payLoad) {
        this.apiContext = apiContext;
        this.payLoad = payLoad;
    }
    
    async getToken() {
        const logInResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
         data:this.payLoad
        })
        const logInResponseJson = await logInResponse.json();
        const token = logInResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(createOrderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:createOrderPayLoad,
        headers:
        {
            'Authorization': response.token,
            'Content-Type' : 'application/json'
        },

    })

    const orderJson = await orderResponse.json();
    const orderID = orderJson.orders[0];
    response.orderID = orderID;
    console.log(orderID);
    return response;
    }
}

module.exports = {apiUtils};