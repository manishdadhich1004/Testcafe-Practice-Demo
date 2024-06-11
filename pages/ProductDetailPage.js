import { Selector, t } from "testcafe";

class ProductDetailPage{
    constructor(){
        this.productPrice = Selector("span[id='price-value-4']").withText('$1,800.00');
        this.productQuantity = Selector("input[id='product_enteredQuantity_4']");
        this.addToCart = Selector("button[id='add-to-cart-button-4']");
        this.successMessage = Selector('#bar-notification p').withText('The product has been added to your shopping cart');
    }
}

export default new ProductDetailPage();