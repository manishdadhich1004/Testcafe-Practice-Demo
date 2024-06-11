import { Selector, t } from "testcafe";

class ShoppingCartPage{
    constructor(){
        this.validateProductName = Selector('a').withText('Apple MacBook Pro 13-inch');
        this.validateCartQuantity = Selector('input.qty-input');
        this.totalValue = Selector("strong").withText('$5,400.00');
        this.termsCheckBox = Selector("input[id='termsofservice']");
        this.checkOutButton = Selector("button[id='checkout']");
        
    }
}

export default new ShoppingCartPage();