import { ClientFunction } from "testcafe";
import HomePage from "../pages/HomePage";
import RegisterPAge from "../pages/RegisterPAge";
import LoginPage from "../pages/LoginPage";
import CheckOutPage from "../pages/CheckOutPage";
import CustomerPage from "../pages/CustomerPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import SearchProductPage from "../pages/SearchProductPage";

const dataSet = require('../data/data.json');
const URL = "https://demo.nopcommerce.com/";
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 1000);
var userEmail = 'manish'+randomNumber+'@test.com';

fixture("E2E Fixture")
    .page(URL);

test("Assert Home Page", async t => {
    await t
    .maximizeWindow()
    .expect(getURL()).eql(URL)
    .expect(HomePage.dashboardSubTitle.exists).ok()
});

dataSet.forEach(data => {
test.meta({
    ID: 'TC_003',
    SEVERITY: 'Highest',
    STORY: 'NEO-003',
})("Place Order E2E test", async t => {
    await t
    .maximizeWindow()
    .click(HomePage.registerLink)
    .expect(getURL()).contains('register')
    .click(RegisterPAge.genderOption)
    .typeText(RegisterPAge.firstName, data.firstName)
    .typeText(RegisterPAge.lastName, data.lastname)
    .typeText(RegisterPAge.emailText, data.email+randomNumber+'@test.com')
    .typeText(RegisterPAge.password, data.password)
    .typeText(RegisterPAge.confirmPassword, data.password)
    .click(RegisterPAge.registerButton)
    .expect(RegisterPAge.confirmRegistration.exists).ok()

    //Logout page
    .click(HomePage.logoutLink)

    //Login Page
    .click(HomePage.loginLink)
    .setPageLoadTimeout(10000)
    .expect(LoginPage.pageHeader.exists).ok()
    .typeText(LoginPage.emailInput, userEmail)
    .typeText(LoginPage.passwordInput, data.password)
    .click(LoginPage.loginButton)

    //Search Product
    await HomePage.search('Apple MacBook Pro 13-inch')
    await t
        .click(SearchProductPage.productText)
        .expect(getURL()).contains('apple-macbook-pro-13-inch')

    //Product detail page
    .expect(ProductDetailPage.productPrice.exists).ok()
    .selectText(ProductDetailPage.productQuantity).pressKey('delete')
    .typeText(ProductDetailPage.productQuantity, '3')
    .click(ProductDetailPage.addToCart)
    .wait(3000)
    .expect(ProductDetailPage.successMessage.visible).ok()

    //cart and checkout
    .click(HomePage.cartLink)
    .expect(ShoppingCartPage.validateProductName.exists).ok()
    .expect(ShoppingCartPage.validateCartQuantity.value).contains('3')
    .expect(ShoppingCartPage.totalValue.exists).ok()
    .click(ShoppingCartPage.termsCheckBox)
    .click(ShoppingCartPage.checkOutButton)
    .expect(getURL()).contains('checkout')

    //Checkout page
    await CheckOutPage.selectCountry(data.country)
    await t
    .typeText(CheckOutPage.cityText, data.city)
    .typeText(CheckOutPage.addressText, data.address)
    .typeText(CheckOutPage.zipText, data.zip)
    .typeText(CheckOutPage.phoneText, data.phone)
    .click(CheckOutPage.continueButton)
    .debug()
    .click(CheckOutPage.nextDayOption)
    .click(CheckOutPage.shippingButton)
    .click(CheckOutPage.paymentOption)
    .click(CheckOutPage.paymentButton)
    .click(CheckOutPage.paymentinfoButton)
    .click(CheckOutPage.confirmOrderButton)
    .expect(CheckOutPage.confirmOrderMessage.exists).ok()
    .click(CheckOutPage.orderDetailLink)
    
})
})
