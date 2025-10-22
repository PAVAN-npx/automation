import { AfterViewInit, ChangeDetectorRef, Component, inject, Inject, Input, model, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExecutionService } from '../services/execution.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TestcaseExecutionComponent } from '../testcase-execution/testcase-execution.component';
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
  export interface DialogData {
  EX_INSTANCE_ID: string;
 
}


@Component({
  selector: 'app-app-steps-dialog',
  standalone: true,
  imports: [FormsModule, MatPaginator, MatProgressSpinnerModule, MatDialogActions, MatDialogContent, CommonModule, MatTableModule, DashboardComponent, MatIconModule, NgxUiLoaderModule],
  templateUrl: './app-steps-dialog.component.html',
  styleUrl: './app-steps-dialog.component.scss'
})
export class AppStepsDialogComponent implements AfterViewInit {
  @Input() EX_INSTANCE_ID: any;
  isloading=true;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  
  constructor(public ngxService: NgxUiLoaderService,public activeModal: NgbActiveModal,public api:ExecutionService,   private cdr: ChangeDetectorRef,public modalService:NgbModal){
    // console.log('uhjhuthis',this.EX_INSTANCE_ID)
  }





   ngOnInit() {
    this.ngxService.start();
  this.isloading=true;
     console.log('uhjhuthis',this.EX_INSTANCE_ID)
     this.api.getstepDetails(this.EX_INSTANCE_ID).subscribe({
      next:(res)=> {


        console.log(res);



            let respData = res.data.sort((a:any, b:any) => {

              

              
          if (a.STATUS === 'Running' && b.STATUS !== 'Running') return -1;
          if (a.STATUS !== 'Running' && b.STATUS === 'Running') return 1;
          return 0;
        });
        console.log(respData);        
        this.dataSource.data=respData;   
         this.ngxService.stop();
          this.isloading=false;    
         
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
    'EX_INSTANCE_STEP_ID',
     'FEATURES',
    'START_TIME',
    'END_TIME',
    // 'EX_MACHINE_NAME',
    'STATUS',
    'TOTAL_CASES',
    'totalexecuted',
    'PASSED',
    'FAILED',
   
    'PASS_PERCENT',
    'AVG_DURATION_MIN',
    'LAST_REPORTED_DATE'
    // "LAST_REPORTED_TIME"
  ];
  
  // readonly dialogRef = inject(MatDialogRef<AppStepsDialogComponent>);
  // readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.EX_INSTANCE_ID);
stepsData: any;
loading: any;
errorMessage: any;


  openStepsDialog(rowData: any) {
    if(rowData.TOTAL_CASES==0){
      return;
    }
    console.log('openStepsDialog', rowData.EX_INSTANCE_STEP_ID);
    const modalRef = this.modalService.open(TestcaseExecutionComponent, {

      // fullscreen:true,       
      centered: true,
      size: 'xl',
      windowClass: 'model-theme-bg',
      backdropClass: 'custom-backdrop'
    });

    modalRef.componentInstance.EX_INSTANCE_STEP_ID = rowData.EX_INSTANCE_STEP_ID;

  }


  close() {
       this.activeModal.close('Modal closed with success!');
  }

}
