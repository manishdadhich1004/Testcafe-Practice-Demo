import { Selector, t } from "testcafe";

class LoginPage{
    constructor(){
        this.emailInput = Selector("input[id='Email']");
        this.passwordInput = Selector("input[id='Password']");
        this.loginButton = Selector("button.button-1.login-button");
        this.pageHeader = Selector("strong").withText("Returning Customer");
    }

}

export default new LoginPage();