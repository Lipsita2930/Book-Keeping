import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RestServicesService } from 'src/app/Services/rest-services.service';
import { ExpenseDetails } from 'src/app/Utilities/ExpenseDetails';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateExpenseComponent } from 'src/app/Screen/expense/update-expense/update-expense.component';
import *as XLSX from 'xlsx';
@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit, AfterViewInit {

  JournalDetails: any;
  localStorageCurrentUser: any;
  email: String = '';
  userId: String = '';
  expenseId: String = '';
  displayedColumns: string[] = ['expenseType', 'totalExpense', 'date', 'status', 'action'];
  dataSource: any;
  expenseList: ExpenseDetails[] = []
  fileName = 'ExcelSheet.xlsx';
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //note the behaviour of ngOnInit
  private listSub = new BehaviorSubject([]);
  listSubObservab = this.listSub.asObservable();

  constructor(private restService: RestServicesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getExpenseDetails();
  }

  ngAfterViewInit() {
    this.listSubObservab.subscribe(listLoaded => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getExpenseDetails() {
    this.localStorageCurrentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.email = this.localStorageCurrentUser.email;
    this.restService.getExpenseDetailsFromRemote(this.email).subscribe((data: ExpenseDetails[]) => {
      this.JournalDetails = data;
      console.log(this.JournalDetails)
      this.dataSource = new MatTableDataSource(this.JournalDetails);
      this.listSub.next(this.dataSource);
    });
  }
  onEditListener(row: any) {
    for (let i = 0; i < this.JournalDetails.length; i++) {
      console.log(this.JournalDetails[i].id);
      if (this.JournalDetails[i].id === (row.id)) {
        row = this.JournalDetails[i];
        break;
      }
    }
    console.log(row);
    this.dialog.open(UpdateExpenseComponent, {
      id: 'updateExpense',
      data: row,
      backdropClass:'chartback'
    })
  }
  onDeleteListener(row: any) {
    this.expenseId = row.id;
    this.userId = this.localStorageCurrentUser.id;

    this.restService.deleteExpenseFromRemote(this.userId, this.expenseId).subscribe((data) => {
      localStorage.clear();
      localStorage.setItem('currentUser', JSON.stringify(data));
      console.log("data deleted Successfully");
      window.location.reload();

    },
      error => { console.log("Error Ocurred"); });
  }

  //downloading the excel Sheet for Expense
  exportExcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}
