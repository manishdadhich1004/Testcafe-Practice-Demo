import { Selector, t } from "testcafe";

class CustomerPage{
    constructor(){
        this.orderLink = Selector("a").withText("Orders")
        this.noOrderLabel = Selector("div.no-data").withText("No orders")
    }
}

export default new CustomerPage();