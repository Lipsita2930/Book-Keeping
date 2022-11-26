import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestServicesService } from 'src/app/Services/rest-services.service';
import { ExpenseDetails } from 'src/app/Utilities/ExpenseDetails';
import {SelectionModel} from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailsComponent } from 'src/app/Components/transaction-details/transaction-details.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.css']
})
export class JournalsComponent implements OnInit ,AfterViewInit{

  localStorageCurrentUser:any;
  email:String='';
  JournalDetails:ExpenseDetails[]=[];
  
  
   //note the behaviour of ngOnInit
   private listSub = new BehaviorSubject([]);
   listSubObservab = this.listSub.asObservable();

  constructor(private restService:RestServicesService,private dialog:MatDialog){}

  displayedColumns: string[] = ['date','transaction','details'];
  dataSource:any;

 
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;


  ngOnInit(): void {
  this.getJournalDetails();
  }
  
  getJournalDetails(){
      this.localStorageCurrentUser= JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.email=this.localStorageCurrentUser.email;
      this.restService.getExpenseDetailsFromRemote(this.email).subscribe((data:ExpenseDetails[])=>{
        this.JournalDetails=data;

        this.dataSource=new MatTableDataSource(this.JournalDetails);
        this.listSub.next(this.dataSource);
      });
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


   detailsListenser(row:any){
    for(let i=0;i<this.JournalDetails.length;i++){
      console.log(this.JournalDetails[i].id);
      if(this.JournalDetails[i].id===(row.id)){
        row=this.JournalDetails[i];
        break;
      }
    }
    this.dialog.open(TransactionDetailsComponent,{
      width:'50%',
      data:row,
      disableClose : true
    })
  
  }




}
