import { test, expect } from '@playwright/test';
import { POManager } from '../Page Objects/POManager';

// Define a type for structured test data
type TestData = {
  LoginType: string;
  Product?: string;
  FirstName?: string;
  LastName?: string;
  PIN?: string;
};

// Helper function to load test data
async function loadTestData(testdata: any, testCaseName: string): Promise<TestData> {
  const fields = ["LoginType", "Product", "FirstName", "LastName", "PIN"];
  const data: Partial<TestData> = {};

  for (const field of fields) {
    const value = await testdata.getExcelData("E2E", testCaseName, field);
    data[field as keyof TestData] = value ? String(value) : undefined;
  }

  return data as TestData;
}

// Common setup for each test
let poManager:POManager;
let testdata:any;
test.beforeEach(async ({ page }, testInfo) => {
  testInfo.snapshotSuffix = ''; // Optional: customize snapshot naming if needed
  poManager = new POManager(page);
  testdata = await poManager.getreusable();
});

// Test 1: Complete E2E flow
test('Sauce Demo test1', async ({ page }, testInfo) => {
  //const poManager = new POManager(page);
  //const testdata = await poManager.getreusable();
  const data = await loadTestData(testdata, testInfo.title);

  const login = await poManager.getLoginPage();
  await login.goToURL();
  await login.Login(data.LoginType);

  const listProduct = await poManager.getProductList();
  await listProduct.getListProducts();
  if (data.Product) await listProduct.selectproduct(data.Product);

  const checkout = await poManager.getCheckOut();
  await checkout.listCheckout();

  const billing = await poManager.getBillingPage();
  if (data.FirstName && data.LastName && data.PIN) {
    await billing.fillContacts(data.FirstName, data.LastName, data.PIN);
  }
  await billing.getTotal();
  await billing.submitOrder();

  // Optional: Add assertion to verify order success
  //await expect(page.locator('.confirmation-message')).toHaveText(/Order submitted successfully/i);
});

// Test 2: Error login scenario
test('Sauce Demo test2 error', async ({ page }, testInfo) => {
  const poManager = new POManager(page);
  const testdata = await poManager.getreusable();
  const data = await loadTestData(testdata, testInfo.title);

  const login = await poManager.getLoginPage();
  await login.goToURL();
  await login.Login(data.LoginType);

  await login.ErrorLoginMsg("Sorry, this user has been locked out");
});

// Test 3: Performance user flow
test('Sauce Demo test3 performance', async ({ page }, testInfo) => {
  const poManager = new POManager(page);
  const testdata = await poManager.getreusable();
  const data = await loadTestData(testdata, testInfo.title);

  const login = await poManager.getLoginPage();
  await login.goToURL();
  await login.Login(data.LoginType);

  const listProduct = await poManager.getProductList();
  await listProduct.getListProducts();
  if (data.Product) await listProduct.selectproduct(data.Product);

  const checkout = await poManager.getCheckOut();
  await checkout.listCheckout();

  const billing = await poManager.getBillingPage();
  if (data.FirstName && data.LastName && data.PIN) {
    await billing.fillContacts(data.FirstName, data.LastName, data.PIN);
  }
  await billing.getTotal();
  await billing.submitOrder();

  // Optional: Add performance-related assertions or timing logs
});
