import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { InvoiceComponent } from 'src/app/Components/invoice/invoice.component';
import { RestServicesService } from 'src/app/Services/rest-services.service';
import { ExpenseDetails } from 'src/app/Utilities/ExpenseDetails';
import *as XLSX from'xlsx';

@Component({
  selector: 'app-invoice-comp',
  templateUrl: './invoice-comp.component.html',
  styleUrls: ['./invoice-comp.component.css']
})
export class InvoiceCompComponent implements OnInit {

  accountDetails:ExpenseDetails[]=[];
  localStorageCurrentUser:any;
  email:String='';
  private listSub = new BehaviorSubject([]);
  listSubObservab = this.listSub.asObservable();
  fileName='ExcelSheet.xlsx';

  constructor(private restService:RestServicesService,private dialog:MatDialog){}

  displayedColumns: string[] = ['date','transaction','assetType','transactionType','FinancialType','Invoice'];
  dataSource:any;
 
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  ngOnInit(): void {
  this.getAccountDetails();
  }
  
  getAccountDetails(){
     this.localStorageCurrentUser= JSON.parse(localStorage.getItem('currentUser') || '{}');
       this.accountDetails=this.localStorageCurrentUser.expenseList;
        this.dataSource=new MatTableDataSource(this.accountDetails);
        this.listSub.next(this.dataSource);
  
  }
  
  ngAfterViewInit() {
    this.listSubObservab.subscribe(listLoaded => { 
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //downloading the excel Sheet for Expense
  exportExcel():void{
    let element=document.getElementById('excel-table');
    const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName);
    }

   invoiceListenser(row:any){
      for(let i=0;i<this.accountDetails.length;i++){
        console.log(this.accountDetails[i].id);
        if(this.accountDetails[i].id===(row.id)){
          row=this.accountDetails[i];
          break;
        }
      }
      this.dialog.open(InvoiceComponent,{
        width:'50%',
        data:row,
        disableClose : true
      })
    }
}
