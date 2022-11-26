import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assets-reports',
  templateUrl: './assets-reports.component.html',
  styleUrls: ['./assets-reports.component.css']
})
export class AssetsReportsComponent implements OnInit {

  basicData: any;
  chartData: any;
  assetData:any[]=[];
  labelData=new Array(6).fill(0);
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData : any){

    this.chartData=editData;
    if(this.chartData!=null){
      for(let i=0;i<this.chartData.length;i++){
   
        this.assetData.push(this.chartData[i].assetType)
      }
      console.log(this.assetData);
      for (let element of this.assetData) {
      console.log(element)
       switch(element){
        case 'Expense':this.labelData[0]++;break;
        case 'Long Term Asset':this.labelData[1]++;break;
        case 'Current Asset':this.labelData[2]++;break;
        case 'Liability':this.labelData[3]++;break;
        default:"No expense type"
       }
      }
       console.log(this.labelData);

    
   }
  }
    
  ngOnInit(): void {
    this.basicData = {
      labels: ["Expense", "Long Term Asset", "Current Asset","Liability"],
      datasets: [
        {
          data: [this.labelData[0],this.labelData[1],this.labelData[2],this.labelData[3]],
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
