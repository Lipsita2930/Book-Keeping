import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateExpenseComponent } from 'src/app/Screen/expense/update-expense/update-expense.component';
import { RestServicesService } from 'src/app/Services/rest-services.service';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { ExpenseDetails } from 'src/app/Utilities/ExpenseDetails';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [ DatePipe ]
})
export class ExpenseComponent implements OnInit {

  email: String = '';
  userId: String = '';
  expenseDetails = new ExpenseDetails();
  date:any='';

  expenseType: Array<String> = ["Electricity", "Rent", "Salaries", "Fees", "Charity", "Purchases"];
  assetType: Array<String> = ["Expense", "Long Term Asset", "Current Asset", "Liability"];
  transaction: Array<String> = ["Debit", "Credit"];
  finStatement: Array<String> = ["Balance Sheet", "Income Statement", "Invoice"];
  paymentType: Array<String> = ["UPI", "Gpay", "Credit Card", "Debit Card","Cash"];
  status: Array<String> = ["Paid", "Unpaid"];


  expense: FormGroup = new FormGroup({
    $key: new FormControl(null),
    expense: new FormControl(null, Validators.required),
    amount: new FormControl(0.00, Validators.required),
    dueDate: new FormControl(null, Validators.required),
    asset: new FormControl(null, Validators.required),
    transaction: new FormControl(null, Validators.required),
    finStatement: new FormControl(null, Validators.required),
    paymentType: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    notes: new FormControl(null, Validators.maxLength(40)),
    sgst: new FormControl(0.00),
    cgst: new FormControl(0.00),
    igst: new FormControl(0.00),
    supplierName: new FormControl(null, Validators.required)
  });

  constructor(private restService: RestServicesService, 
    private sharedService: SharedService,
     private userservice: UserService, private dialog: MatDialog,
     private datePipe: DatePipe,
     private route :Router) {
    this.email = JSON.parse(localStorage.getItem('currentUser') || '{}').email;
  }

  ngOnInit(): void {
  }

  expenseSubmitHandler() {
    if (this.expense.valid) {
    this.date=this.expenseDetails.dueDate;
    this.date=this.datePipe.transform(this.date, 'dd-MM-yyyy');
    this.expenseDetails['dueDate']=this.date;
    
     
      this.userservice.getUserByEmail(this.email).subscribe(data => {
        this.userId = data.id;
        this.restService.saveExpenseFromRemote(this.expenseDetails, this.userId).subscribe(
          data => {
            console.log("response received");
            console.log(data);
            localStorage.clear();
            localStorage.setItem('currentUser', JSON.stringify(data));
          //  this.sharedService.sharedNotification("Data saved Successfully", "ok");
          this.route.navigate(['/main/expense-details'])
          },
          error => { console.log("Error Ocurred"); });
      });
    }

    else {
      this.sharedService.sharedNotification("Invalid data", "ok");
    }
  }
}
