import { Component, Inject, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  currentUser:any;
  invoiceid:number=0;
  cgst:number=0;
  sgst:number=0;
  igst:number=0;
  constructor( @Inject (MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.invoiceid=Math.random()*1000000;
    this.sgst=(this.editData.sgst*this.editData.amount)/100;
    this.cgst=(this.editData.cgst*this.editData.amount)/100;
    this.igst=(this.editData.igst*this.editData.amount)/100;
  }

}
