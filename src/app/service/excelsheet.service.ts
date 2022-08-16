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
        const heading = [['','',filename]]
        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        var range = { s: { c: 0, r: 0 }, e: { c: 3, r: 0 } };//A1:A5
        var data = XLSX.utils.encode_range(range);
        console.log(data);
        XLSX.utils.sheet_add_aoa(myworksheet,heading);
        XLSX.utils.sheet_add_json(myworksheet, json, { origin: 'A2' },);

        // const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        let wscols =[
            {wpx:30},
            {wpx:100},
            {wpx:100},
            {wpx:600},
        ]
        myworksheet["!margins"]= {left:1.0, right:1.0, top:1.0, bottom:1.0, header:0.5, footer:0.5 }
        myworksheet['!cols']=wscols
        const myworkbook: XLSX.WorkBook = { Sheets: { 'Tasksheet': myworksheet }, SheetNames: ['Tasksheet'] };
        myworkbook.Props={CreatedDate:new Date()}
        const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array'});
        this.saveAsExcelFile(excelBuffer, filename);  
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }
}