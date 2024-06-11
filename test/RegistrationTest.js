import { ClientFunction } from "testcafe";
import HomePage from '../pages/HomePage';
import RegisterPAge from "../pages/RegisterPAge";
import LoginPage from "../pages/LoginPage";
import CustomerPage from "../pages/CustomerPage";

const dataSet = require('../data/data.json');
const URL = "https://demo.nopcommerce.com/";
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
// var userEmail = data.email+randomNumber+'@test.com';

fixture("Registration Fixture")
    .page(URL);

test("Assert Home Page URL", async t => {
    await t
        .maximizeWindow()
        .expect(getURL()).eql(URL)
        .expect(HomePage.dashboardSubTitle.exists).ok();
})

dataSet.forEach(data => {
test.meta({
    ID: 'TC_002',
    SEVERITY: 'blocker',
    STORY: 'NEO-002',
})("User registration and Login page", async t => {
    await t
        .click(HomePage.registerLink)
        .maximizeWindow()
        .expect(getURL()).contains('register')
        .click(RegisterPAge.genderOption)
        .typeText(RegisterPAge.firstName, data.firstName)
        .typeText(RegisterPAge.lastName, data.lastname)
        await RegisterPAge.selectDay(data.birthday)
        await RegisterPAge.selectMonth(data.birthmonth)
        await RegisterPAge.selectYear(data.birthyear)
        await t
        .typeText(RegisterPAge.emailText, data.email+randomNumber+'@test.com')
        .typeText(RegisterPAge.password, data.password)
        .typeText(RegisterPAge.confirmPassword, data.password)
        .click(RegisterPAge.registerButton)
        .expect(RegisterPAge.confirmRegistration.exists).ok()

        //Logout
        .click(HomePage.logoutLink)
        
        //Login with register account
        .click(HomePage.loginLink)
        .expect(LoginPage.pageHeader.exists).ok()
        .typeText(LoginPage.emailInput, data.email+randomNumber+'@test.com')
        .typeText(LoginPage.passwordInput, data.password)
        .click(LoginPage.loginButton)

        //Go to my account
        .click(HomePage.myAccountLink)

        //Check Order is displayed
        .expect(CustomerPage.orderLink.exists).ok()
        .click(CustomerPage.orderLink)
        .expect(CustomerPage.noOrderLabel.exists).ok()

        
})
})