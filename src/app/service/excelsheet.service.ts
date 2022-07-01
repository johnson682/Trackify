import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
    providedIn:'root'
})

export class ExcelsheetService{
    
    exportAsExcelFile(json:any,filename:string){
        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, filename);
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }
}