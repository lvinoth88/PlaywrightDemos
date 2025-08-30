import { type Page } from '@playwright/test';
import {LoginPage} from '../Page Objects/LoginPage';
import {ProductList} from '../Page Objects/ProductList';
import {CheckOut} from '../Page Objects/CheckOut';
import {BillingPage} from '../Page Objects/BillingPage';
import {reusable} from '../utility/reusable'

export class POManager{

    readonly page:Page;
    constructor(page:Page){
        this.page=page;
    }
    async getLoginPage(){
          return new LoginPage(this.page);
    }
    async getProductList(){
          return new ProductList(this.page);
    }
    async getCheckOut(){
          return new CheckOut(this.page);
    }
    async getBillingPage(){
          return new BillingPage(this.page);
    }
    async getreusable(){
          return new reusable();
    }
}
