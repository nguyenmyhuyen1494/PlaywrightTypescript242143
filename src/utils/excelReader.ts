import * as EXCEL from 'xlsx';
import * as FS from 'fs';

// Define type for rows
export interface ExcelData {
  Username: string;
  Password: string;
}

export function readExcelFile(filePath: string, sheetName: string): ExcelData[] {

  // Check file exists
  if (!FS.existsSync(filePath)) {
    throw new Error(`❌ File not found: ${filePath}`);
  }

  // Read the Excel file
  const workbook = EXCEL.readFile(filePath);

  // Check sheet exists
  if (!workbook.Sheets[sheetName]) {
    throw new Error(`❌ Sheet not found: ${sheetName}`);
  }

  // Get sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet into array of objects
  const jsonData: any[] = EXCEL.utils.sheet_to_json(sheet, { defval: '' });

  // Standardize & validate Excel headers
  const records: ExcelData[] = jsonData.map((row: any) => {
    return {
      Username: row["Username"] || "",
      Password: row["Password"] || "",
    };
  });

  return records;
}
