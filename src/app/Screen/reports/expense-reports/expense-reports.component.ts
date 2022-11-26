import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart ,registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-expense-reports',
  templateUrl: './expense-reports.component.html',
  styleUrls: ['./expense-reports.component.css']
})
export class ExpenseReportsComponent implements OnInit {

  chartData:any;
  expenseData:any[]=[];
  labelData=new Array(6).fill(0);
  multiAxisData:any;
  multiAxisOptions:any;

  constructor( @Inject (MAT_DIALOG_DATA) public editData:any) {
    this.chartData=this.editData
    if(this.chartData!=null){
      for(let i=0;i<this.chartData.length;i++){
        this.expenseData.push(this.chartData[i].expenseType)
      }
      console.log(this.expenseData);
    for (let element of this.expenseData) {
      console.log(element)
       switch(element){
        case 'Electricity':this.labelData[0]++;break;
        case 'Rent':this.labelData[1]++;break;
        case 'Salaries':this.labelData[2]++;break;
        case 'Fees':this.labelData[3]++;break;
        case 'Charity':this.labelData[4]++;break;
        case 'Purchases':this.labelData[5]++;break;
        default:"No expense type"
       }
      }
       console.log(this.labelData);

    
   }
  }

  ngOnInit(): void {
   
   

  // console.log(this.labelData)
  // this.RenderChart(this.expenseData,this.labelData);
  this.multiAxisData = {
    labels: ['Electricity', 'Rent', 'Salaries', 'Fees', 'Charity', 'purchases'],
    datasets: [{
        label: 'DataSet 1',
        backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#FFCA28',
            '#26A69A'
        ],
        yAxisID: 'y',
        data:this.labelData
      }]
    // }, {
    //     label: 'Dataset 2',
    //     backgroundColor: '#78909C',
    //     yAxisID: 'y1',
    //     data: this.labelData
    // }]
};

this.multiAxisOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        },
        tooltips: {
            mode: 'index',
            intersect: true
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                min: 0,
                max: 100,
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
                color: '#ebedef'
            },
            ticks: {
                min: 0,
                max: 100,
                color: '#495057'
            }
        }
    }
};

  }}