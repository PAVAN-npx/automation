import { AfterViewInit, ChangeDetectorRef, Component, inject, Inject, Input, model, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
   import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExecutionService } from '../services/execution.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";

  export interface DialogData {
  EX_INSTANCE_ID: string;
 
}


@Component({
  selector: 'app-app-steps-dialog',
  standalone: true,
    providers: [DatePipe], 
  imports: [FormsModule, MatPaginator, MatDialogActions, MatDialogContent, CommonModule, MatTableModule, DashboardComponent, MatIconModule, TestcaseExecutionComponent, NgxUiLoaderModule,DatePipe],
  templateUrl: './testcase-execution.component.html',
  styleUrl: './testcase-execution.component.scss'
})
export class TestcaseExecutionComponent implements AfterViewInit {
  @Input() EX_INSTANCE_STEP_ID: any;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
isloading=true;
  
  constructor(public ngxService: NgxUiLoaderService,public activeModal: NgbActiveModal,public api:ExecutionService,   private cdr: ChangeDetectorRef ,public datePipe:DatePipe){
    // console.log('uhjhuthis',this.EX_INSTANCE_ID)
  }





   ngOnInit() {
    this.isloading=true;
        // this.ngxService.start();

  
     console.log('testcaseexecution',this.EX_INSTANCE_STEP_ID)
     this.api.getExecutions(this.EX_INSTANCE_STEP_ID).subscribe({
      next:(res)=> {
        console.log(res);
        this.dataSource.data=res.data; 

        this.isloading=false;
        // this.ngxService.stop();
      
      },

      error :(err)=>{console.log(err);}
      
     })

          this.dataSource.paginator = this.paginator1;

      // Trigger change detection manually
      this.cdr.detectChanges();
  }

     ngAfterViewInit() {
    this.dataSource.paginator = this.paginator1; 
  }

  

 displayedColumns: string[] = [
    'TESTCASE_EXTERNAL_ID',
    'START_TIME',
    'END_TIME',
     'STATUS',
    'NOTES',
    'ACCOUNTNO',
  ];
  
  // readonly dialogRef = inject(MatDialogRef<AppStepsDialogComponent>);
  // readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.EX_INSTANCE_ID);
stepsData: any;
loading: any;
errorMessage: any;
  onExport() {
      const dataToExport = this.dataSource.data.map(row => {
    return {
      
TESTCASE_EXTERNAl: row.TESTCASE_EXTERNAL_ID,
      
      START_TIME:this.api.formatValue( row.START_TIME)?this.datePipe.transform(
        row.START_TIME,
        'dd/MM/yyyy hh:mm:ss a'
      )!:'',
     
      
      
      END_TIME:this.api.formatValue( row.END_TIME)?this.datePipe.transform(
     row.END_TIME,
      'dd/MM/yyyy hh:mm:ss a'
    )!:'',     
    STATUS: row.STATUS, 
    ACCOUNTNO: row.ACCOUNTNO,
    NOTES: row.NOTES,
   
     
   
    };
  });
    this.api.exportTableToExcel(dataToExport, 'Testcase_Report');
  }

  close() {
       this.activeModal.close('Modal closed with success!');
  }

}
