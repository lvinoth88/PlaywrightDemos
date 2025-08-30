import { expect, type Locator, type Page } from '@playwright/test';

export class ProductList{

    readonly page:Page;
    readonly ListLast:Locator;
    readonly allList:Locator;
    readonly invenList:Locator;
    constructor(page:Page){
        this.page=page;
        this.ListLast=page.locator(".inventory_item_description>div>a>div")
        this.allList=page.locator(".inventory_item_description>div>a>div")
        this.invenList=page.locator(".inventory_list>div")
    }
    async getListProducts(){
        await this.ListLast.last();
        let a:any=await this.allList.allTextContents();
        console.log(a);
    }
    async selectproduct(product:String){
        let totalproduct:Locator[]=await this.invenList.all();
        for(let val of totalproduct){
            let label:any=await val.locator("div:nth-child(2)>div>a").textContent();
            if(product.includes(label)){
            await val.locator("div:nth-child(2)>div:nth-child(2)>button").click();
            break;
            }
        }
    }
}

