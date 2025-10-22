import { Component, EventEmitter, OnInit, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExecutionService } from '../services/execution.service';
import { AppStepsDialogComponent } from '../app-steps-dialog/app-steps-dialog.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';
// import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    CommonModule,
    DatePipe,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    AppStepsDialogComponent,
    MatPaginatorModule,
    MatSortModule,
    NgxUiLoaderModule
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  executions: any[] = [];
  startDate: Date | null = new Date(new Date().setDate(new Date().getDate() - 3));
  endDate:any;
  filteredExecutions: any[] = [];
  secondDialog: NgbModalRef | undefined;
  isLoading = true; 

  filterParams = {
    startDate: '',
    endDate: '',
    planName: '',
    feature: '',
    status: ''
  };

    filterParamsapi = {
    startDate: '',
    endDate: '',
    planName: '',
    feature: '',
    status: ''
  };

  displayedColumns: string[] = [
    'EX_INSTANCE_ID',
    'PLANNAME',
    'EX_MACHINE_NAME',
    'steps',
    'STATUS',
    'START_TIME',
    'END_TIME',
    'cases',
    'totalexecuted',
    'Passed',
    'Failed',
    'PASS_PERCENT',
    'AVG_DURATION_MIN',
    'LAST_Reported_DATE',
    'Action',

  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  summary: any;

  // dialog: any;
  constructor(public ngxService: NgxUiLoaderService,public api: ExecutionService, private dialog: MatDialog, private modalService: NgbModal, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.isLoading = true;
        this.ngxService.start();
    this.filterParams.startDate = this.datePipe.transform(this.startDate, 'dd/MM/yyyy') || '';
    this.api.getSummary(this.filterParams).subscribe({
      next: (res) => {
        console.log(res);
           const sorted = res.data.sort((a:any, b:any) => {
     
      if (a.STATUS === 'Running' && b.status !== 'Running') return -1;
      if (a.status !== 'Running' && b.status === 'Running') return 1;

      return b.EX_INSTANCE_ID - a.EX_INSTANCE_ID;
    });
        this.dataSource.data = sorted;
         this.ngxService.stop();

      },
      error: (err) => console.error(err)
    })
this.isLoading=false;
  }




  openStepsDialog(rowData: any) {
    console.log('openStepsDialog', rowData.EX_INSTANCE_ID);
    const modalRef = this.modalService.open(AppStepsDialogComponent, {

      // fullscreen:true,       
      centered: true,
      size: 'xl',
      windowClass: 'model-theme-bg',
      backdropClass: 'custom-backdrop'
    });

    modalRef.componentInstance.EX_INSTANCE_ID = rowData.EX_INSTANCE_ID;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
let sorted:any=null;
     this.isLoading = true;
     console.log(this.filterParams);
    let filterParamapi=this.filterParams;
    this.filterParams.endDate = this.datePipe.transform(this.endDate, 'dd/MM/yyyy') || '';
    this.filterParams.startDate = this.datePipe.transform(this.startDate, 'dd/MM/yyyy') || '';
    this.api.getSummary(filterParamapi).subscribe({
      next: (res) => {
        console.log(res);

if( res.data?.length > 0){
      sorted = res.data.sort((a:any, b:any) => {
     
      if (a.STATUS === 'Running' && b.status !== 'Running') return -1;
      if (a.status !== 'Running' && b.status === 'Running') return 1;

      return b.EX_INSTANCE_ID - a.EX_INSTANCE_ID;
    });
        this.dataSource.data = sorted;
  }
  this.dataSource.data =  sorted;
  this.isLoading=false;


      },
      error: (err) => console.error(err)
    })
   
 
  }
updatestatus(element:any){
  if(element.STATUS.toUpperCase()!="RUNNING"){ return}
this.api.updatestatus(element.EX_INSTANCE_ID).subscribe({
  next:(res)=>{
    console.log(res)
    if(res.status.errorNo==0){
      this.applyFilters();
    } 
  },
  error:(err)=>{console.log(err)}
});

}

  onExport() {
    this.api.exportTableToExcel('dashboardTable', 'Dashboard_Report');
  }
  resetFilters(): void {
    this.startDate=null;
    this.endDate=null;
    this.filterParams = {
      startDate: '',
      endDate: '',
      planName: '',
      feature: '',
      status: ''
    };
    this.filteredExecutions = [...this.executions];
  }

  openModal(content: any) {
    this.modalService.open(content, {

      fullscreen: true,
      centered: true,
    });
  }

  isObject(val: any) {
    return val && Object.keys(val).length > 0;
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

