import { Selector, t } from "testcafe";

class SearchProductPage{
    constructor(){
        this.productItem = Selector("div.product-item")
        this.productText = Selector('a').withText('Apple MacBook Pro 13-inch')
    }
}

export default new SearchProductPage();