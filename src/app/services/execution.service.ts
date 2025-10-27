import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {
  private apiUrl = environment.apiurl;  
 

  constructor(private http: HttpClient) {}
    headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json' 
    });

      formatValue(value: any): any {
    if ( (typeof value === 'object' && Object.keys(value).length === 0)) {
      return false;
    }
    return true;
  }

  getExecutions(EX_INSTANCE_STEP_ID: string): Observable<any> {
    console.log('testcaseexecutionservice',EX_INSTANCE_STEP_ID);
    const params = new HttpParams().set('EX_INSTANCE_STEP_ID', EX_INSTANCE_STEP_ID.toString());
     return this.http.post(`${this.apiUrl}/SummaryDetailsbyId`, {}, { headers:this.headers, params });
  }

  getstepDetails(EX_INSTANCE_ID:string): Observable<any> {   

   console.log(EX_INSTANCE_ID);
    const params = new HttpParams().set('Ex_Instance_Id', EX_INSTANCE_ID.toString());
     return this.http.post(`${this.apiUrl}/SummaryDetails`, {}, { headers:this.headers, params });
     
  }

    getSummary(filter: any): Observable<any> {
   
    console.log(filter);
    return this.http.post<any>(`${this.apiUrl}/summary`, filter, { headers:this.headers });
  }

  
  updatestatus(EX_INSTANCE_ID:string): Observable<any> {   

   console.log(EX_INSTANCE_ID);
    const params = new HttpParams().set('Ex_Instance_Id', EX_INSTANCE_ID.toString());
     return this.http.put(`${this.apiUrl}/UpdateSummaryDetailsById`, {}, { headers:this.headers, params });
     
  }


    exportTableToExcel(dataToExport:any,fileName:string): void {
   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${fileName}_${new Date().toISOString().slice(0,10)}.xlsx`);
  }
}
