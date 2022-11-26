import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  constructor(  @Inject (MAT_DIALOG_DATA) public editData:any) { }

  sgst:number=0;
  cgst:number=0;
  igst:number=0;

  ngOnInit(): void {
    console.log("row",this.editData);
    this.sgst=(this.editData.sgst*this.editData.amount)/100;
    this.cgst=(this.editData.cgst*this.editData.amount)/100;
    this.igst=(this.editData.igst*this.editData.amount)/100;
  }
  

}
