import { expect, type Locator, type Page } from '@playwright/test';
import {reusable} from '../utility/reusable'

export class BillingPage extends reusable{

    readonly page:Page;
    readonly firstName:Locator;
    readonly lastName:Locator;
    readonly postal:Locator;
    readonly continueBtn:Locator;
    readonly summaryTotal:Locator;
    readonly finishBtn:Locator;
    constructor(page:Page){
        super();
        this.page=page;
        this.firstName=page.locator("#first-name")
        this.lastName=page.locator("#last-name")
        this.postal=page.locator("#postal-code")
        this.continueBtn=page.locator("#continue")
        this.summaryTotal=page.locator(".summary_total_label")
        this.finishBtn=page.locator("#finish")
    }
    async fillContacts(Fname:string,Lname:string,pin:string){
        await this.firstName.fill(Fname);
        await this.lastName.fill(Lname);
        await this.postal.fill(pin);
        await this.continueBtn.click();
    }
    async getTotal(){
        let b=await this.summaryTotal.textContent();
        console.log(b);
    }
    async submitOrder(){
        await reusable.takeScreenshot(this.page);
        await this.finishBtn.click();
    }
}
