import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.css']
})
export class FinancialReportComponent implements OnInit {

  chartData:any;
  financeData:any[]=[];
  labelData=new Array(6).fill(0);
  data:any;
  chartOptions:any;

  constructor( @Inject (MAT_DIALOG_DATA) public editData:any) {
    this.chartData=this.editData
    if(this.chartData!=null){
      for(let i=0;i<this.chartData.length;i++){
        this.financeData.push(this.chartData[i].financialType)
      }
      console.log(this.financeData);
      for (let element of this.financeData) {
      console.log(element)
       switch(element){
        case 'Balance Sheet':this.labelData[0]++;break;
        case 'Income Statement':this.labelData[1]++;break;
        case 'Invoice':this.labelData[2]++;break;
        default:"No finance type"
       }
      }
       console.log(this.labelData);

    
   }
  }

  ngOnInit() {
    this.data = {
        datasets: [{
            data:this.labelData,
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#26C6DA",
            ],
            label: 'Financial Type'
        }],
        labels: [
            "Balance Sheet",
            "Income Statement",
            "Invoice",
            "Other",
            
        ]
    };
  }
}