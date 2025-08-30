import { test, expect, Locator } from '@playwright/test';
import {POManager} from '../Page Objects/POManager';

let poManager:POManager;
let testdata;

test.beforeEach(async({page})=>{
  poManager=new POManager(page);
  testdata=await poManager.getreusable();
});

test('Sauce Demo test1', async ({ page }) => {

  let LoginType:any=await testdata.getExcelData("E2E",test.info().title,"LoginType");
  let Product:any=await testdata.getExcelData("E2E",test.info().title,"Product");
  let FirstName:any=await testdata.getExcelData("E2E",test.info().title,"FirstName");
  let LastName:any=await testdata.getExcelData("E2E",test.info().title,"LastName");
  let PIN:string=String(await testdata.getExcelData("E2E",test.info().title,"PIN"));

  const login=await poManager.getLoginPage();
  await login.goToURL();
  await login.Login(LoginType)

  const listProduct=await poManager.getProductList();
  await listProduct.getListProducts();  
  const product:string=Product;
  await listProduct.selectproduct(product);

  const checkout=await poManager.getCheckOut();;
  await checkout.listCheckout();  

  const billing=await poManager.getBillingPage();;
  await billing.fillContacts(FirstName,LastName,PIN)
  await billing.getTotal();
  await billing.submitOrder();
});

test('Sauce Demo test2 error', async ({ page }) => {

  let LoginType:any=await testdata.getExcelData("E2E",test.info().title,"LoginType");
  const login=await poManager.getLoginPage();
  await login.goToURL();
  await login.Login(LoginType)
  await login.ErrorLoginMsg("Sorry, this user has been locked out");
});

test('Sauce Demo test3 performance', async ({ page }) => {

  let LoginType:any=await testdata.getExcelData("E2E",test.info().title,"LoginType");
  let Product:any=await testdata.getExcelData("E2E",test.info().title,"Product");
  let FirstName:any=await testdata.getExcelData("E2E",test.info().title,"FirstName");
  let LastName:any=await testdata.getExcelData("E2E",test.info().title,"LastName");
  let PIN:string=String(await testdata.getExcelData("E2E",test.info().title,"PIN"));

  const login=await poManager.getLoginPage();
  await login.goToURL();
  await login.Login(LoginType)

  const listProduct=await poManager.getProductList();
  await listProduct.getListProducts();  
  const product:string=Product;
  await listProduct.selectproduct(product);

  const checkout=await poManager.getCheckOut();;
  await checkout.listCheckout();  

  const billing=await poManager.getBillingPage();;
  await billing.fillContacts(FirstName,LastName,PIN)
  await billing.getTotal();
  await billing.submitOrder(); 
});