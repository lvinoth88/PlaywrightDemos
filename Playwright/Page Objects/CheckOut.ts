import { expect, type Locator, type Page } from '@playwright/test';

export class CheckOut{

    readonly page:Page;
    readonly cartLink:Locator;
    readonly checkout:Locator;
    constructor(page:Page){
        this.page=page;
        this.cartLink=page.locator(".shopping_cart_link")
        this.checkout=page.locator("#checkout")
    }
    async listCheckout(){
        await this.cartLink.click();
        await this.checkout.click();
    }
}
