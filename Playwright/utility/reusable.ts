import { expect, type Locator, type Page } from '@playwright/test';
import path from 'path';
import * as XLSX from 'xlsx';
export class reusable{

    static async takeScreenshot(page:Page){
          await page.screenshot({path:"C:/Users/lvino/OneDrive/Documents/screen.png"})
    }
    async getExcelData(sheetName: string, testCaseName: string, columnName: string): Promise<string | undefined>{
        try {
            //const filePath=path.join(process.cwd(),'TestData','ExcelTestData.xlsx')
            const filePath = path.join('C:', 'Users', 'lvino', 'OneDrive', 'Learning', 'Playwright', 'TestData', 'ExcelTestData.xlsx');
            //const filePath="const filePath: string = "C:\Users\\lvino\OneDrive\Learning\Playwright\TestData\ExcelTestData.xlsx";
            const workbook = XLSX.readFile(filePath);
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet);
            const matchedRow = jsonData.find(row => row['Test Case Name'] === testCaseName);
            return matchedRow ? matchedRow[columnName] : undefined;
        } 
        catch (error) {
            console.error(`Error reading Excel file: ${error}`);
            return undefined;
        }

    }
}