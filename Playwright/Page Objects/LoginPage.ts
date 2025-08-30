import { expect, type Locator, type Page } from '@playwright/test';
import param from '../TestData/Global.json'
import loginData from '../TestData/LoginDetails.json'

export class LoginPage{

    readonly page:Page;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginbtn:Locator;
    readonly errormsg:Locator;
    constructor(page:Page){
        this.page=page;
        this.username=page.locator("#user-name")
        this.password=page.locator("#password")
        this.loginbtn=page.locator("#login-button")
        this.errormsg=page.locator(".error-message-container>h3")
    }
    async goToURL(){

        let URL:string
        switch((param.Environment).toUpperCase()){
        case "QA":
            URL="https://www.saucedemo.com/";
            break;
        case "DEV":
            URL="https://www.saucedemodev.com/";
            break;
        default:
            URL="https://www.saucedemo.com/";
        }
        await this.page.goto(URL);
    }
    async Login(value:string){
        let env:string=param["Environment"].toUpperCase();
        let username=loginData[env][value]["Username"]
        let password=loginData[env][value]["Password"]
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbtn.click();
    }
    async ErrorLoginMsg(msg:string){
          await expect(this.errormsg).toContainText(msg);
    }
}