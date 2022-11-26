import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseDetailsComponent } from 'src/app/Screen/expense-details/expense-details.component';
import { RestServicesService } from 'src/app/Services/rest-services.service';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { ExpenseDetails } from 'src/app/Utilities/ExpenseDetails';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css'],
  providers:[DatePipe]
})
export class UpdateExpenseComponent implements OnInit {

  date:any;
  expenseDetails:any;
  userId:String='';
  expenseId:String='';
  expenseType : Array<String> = ["Electricity","Rent","Salaries","Fees","Charity","Purchases"];
  assetType : Array<String> = ["Expense","Long Term Asset","Current Asset","Liability"];
  transaction : Array<String> = ["Debit" , "Credit"];
  finStatement : Array<String> = ["Balance Sheet", "Income Statement" , "Invoice"];
  status:Array<String>=["Paid","Unpaid"];
  paymentType: Array<String> = ["UPI", "Gpay", "Credit Card", "Debit Card","Cash"];


  constructor(private userService:UserService,private restService:RestServicesService,private sharedService:SharedService,
    @Inject (MAT_DIALOG_DATA) public editData:any,  public dialogRef: MatDialogRef<ExpenseDetailsComponent>,
    private datePipe:DatePipe) {
    this.userId=JSON.parse(localStorage.getItem('currentUser') || '{}').id;
   }
  
    updateExpense : FormGroup = new FormGroup({
      expenseType: new FormControl(null, Validators.required),
      amount: new FormControl(0.00, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      assetType: new FormControl(null, Validators.required),
      transactionType: new FormControl(null, Validators.required),
      financialType: new FormControl(null, Validators.required),
      paymentType: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.maxLength(40)),
      sgst: new FormControl(0.00),
      cgst: new FormControl(0.00),
      igst: new FormControl(0.00),
      supplierName: new FormControl(null, Validators.required)

  });
 

  ngOnInit(): void {
    
    if(this.editData){
      this.expenseId=this.editData.id;
      console.log(this.editData);
      
      this.updateExpense.controls['expenseType'].setValue(this.editData.expenseType);
      this.updateExpense.controls['amount'].setValue(this.editData.amount);
      this.updateExpense.controls['assetType'].setValue(this.editData.assetType);
      this.updateExpense.controls['transactionType'].setValue(this.editData.transactionType);
      this.updateExpense.controls['financialType'].setValue(this.editData.financialType);
      this.updateExpense.controls['status'].setValue(this.editData.status);
      this.updateExpense.controls['notes'].setValue(this.editData.notes);
      this.updateExpense.controls['sgst'].setValue(this.editData.sgst);
      this.updateExpense.controls['igst'].setValue(this.editData.igst);
      this.updateExpense.controls['cgst'].setValue(this.editData.cgst);
      this.updateExpense.controls['supplierName'].setValue(this.editData.supplierName);
      this.updateExpense.controls['paymentType'].setValue(this.editData.paymentType);
      this.updateExpense.controls['dueDate'].setValue(this.editData.dueDate);
     console.log(this.updateExpense.controls['dueDate']);
     
  }
  }

  updateExpenseSubmitHandler(){
    this.expenseDetails=this.updateExpense.value;
    this.date=this.expenseDetails.dueDate;
    this.date=this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.expenseDetails['dueDate']=this.date;
     this.restService.updateExpenseFromRemote(this.expenseDetails,this.userId,this.expenseId).subscribe(
      data =>{
        console.log("response received");
         console.log(data);
         localStorage.clear();  
         localStorage.setItem('currentUser',JSON.stringify(data));
        window.location.reload();
        this.sharedService.sharedNotification("Data Updated Successfully","ok");
        this.dialogRef.close();
      },
      error =>{console.log("Error ");});
    }

}
