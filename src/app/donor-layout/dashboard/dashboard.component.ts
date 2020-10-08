import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

import { TokenService } from './../../service/token.service';
import { DonorApiService } from './../../service/donor-api.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  email;
  selectedDonor;
  getDonorByEmailSub;
  donorRequest;

  constructor(
    private tokenService: TokenService,
    private apiService:DonorApiService,
  ) { 
    this.chartOptions = {
      series: [
        {
          name: "Donations",
          data: [55, 44, 55, 57, 56, 61, 58, 63, 60]
        },
        {
          name: "Needs",
          data: [44, 76, 85, 45, 98, 87, 80, 91, 32]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "75%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ]
      },
      yaxis: {
        title: {
          text: "Monthly hair donations"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return  val + "wigs";
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.email=this.tokenService.getEmail();
    console.log(this.email);
    this.getDonorByEmailSub = this.apiService.getDonorByEmail(this.email).subscribe((data)=>{
      this.selectedDonor=data['data'];
      this.donorRequest = this.selectedDonor.request;

      console.log(this.donorRequest)
    })
  }


}
