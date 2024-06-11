import { Selector, t } from "testcafe";

class CheckOutPage{
    constructor(){
        this.countyList = Selector("select[id='BillingNewAddress_CountryId']");
        this.cityText = Selector("input[id='BillingNewAddress_City']");
        this.addressText = Selector("input[id='BillingNewAddress_Address1']");
        this.zipText = Selector("input[id='BillingNewAddress_ZipPostalCode']");
        this.phoneText = Selector("input[id='BillingNewAddress_PhoneNumber']");
        this.continueButton = Selector("button.button-1.new-address-next-step-button");
        this.nextDayOption = Selector("#shippingoption_1");
        this.shippingButton = Selector("button.button-1.shipping-method-next-step-button");
        this.paymentOption = Selector("input[id='paymentmethod_0']");
        this.paymentButton = Selector("button.button-1.payment-method-next-step-button");
        this.paymentinfoButton = Selector("button.button-1.payment-info-next-step-button");
        this.confirmOrderButton = Selector("button.button-1.confirm-order-next-step-button");
        this.confirmOrderMessage = Selector("strong").withText("Your order has been successfully processed!");
        this.orderDetailLink = Selector("a").withText("Click here for order details.");
    }

    async selectCountry(country){
        const countryOption = this.countyList.find('option')
        await t
            .click(this.countyList)
            .click(countryOption.withText(country))
    }
}

export default new CheckOutPage();