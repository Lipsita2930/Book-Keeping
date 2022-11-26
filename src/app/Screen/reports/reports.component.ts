import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssetsReportsComponent } from './assets-reports/assets-reports.component';
import { ExpenseReportsComponent } from './expense-reports/expense-reports.component';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  localStorageCurrentUser:any;
  chartData:any;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    this.localStorageCurrentUser= JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.chartData=this.localStorageCurrentUser?.expenseList;
  }
  expenseReports(){this.dialog.open(ExpenseReportsComponent,{ data:this.chartData,id:'chartDialog',backdropClass:'chartback', disableClose : true})}

  paymentReports(){ this.dialog.open(PaymentReportComponent,{ data : this.chartData,id:'chartDialog',backdropClass:'chartback' , disableClose : true})}

  assetReports(){ this.dialog.open(AssetsReportsComponent,{ data : this.chartData,id:'chartDialog',backdropClass:'chartback' , disableClose : true})}

  financialReports(){ this.dialog.open(FinancialReportComponent,{ data : this.chartData,id:'chartDialog',backdropClass:'chartback' , disableClose : true})}

}
