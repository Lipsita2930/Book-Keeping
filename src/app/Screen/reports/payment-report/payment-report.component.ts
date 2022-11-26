import { Component, OnInit , Inject} from '@angular/core';
import { MatDialog , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {

  basicData: any;
  chartOptions: any;
  creditAmount : number = 0;
  debitAmount : number = 0;
  cashAmount : number = 0;
  upiAmount : number = 0;
  gpayAmount:number=0;
  totalAmount : number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public retrievedData : any
  ) { 
    console.log(retrievedData);
    for(let i of retrievedData){
      if (i.paymentType === "Credit Card")
        this.creditAmount += i.amount;
      else if(i.paymentType === "Debit Card")
        this.debitAmount += i.amount;
      else if(i.paymentType === "UPI")
        this.upiAmount += i.amount;
      else if(i.paymentType==='Gpay')
        this.gpayAmount+=i.amount;
      else
        this.cashAmount +=i.amount;
    }
    this.totalAmount = this.creditAmount + this.debitAmount + this.upiAmount +this.gpayAmount+ this.cashAmount;
  }

  ngOnInit(): void {
    this.basicData = {
      labels: ["Credit Card", "Debit Card", "UPI","Gpay", "Cash"],
      datasets: [
        {
          data: [this.creditAmount, this.debitAmount, this.upiAmount,this.gpayAmount, this.cashAmount],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#C8FFD4"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#C8FFD4"
          ]
        }
      ]
    };
  }
}
