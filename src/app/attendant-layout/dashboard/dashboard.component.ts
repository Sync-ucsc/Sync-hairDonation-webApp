import { ViewCalendarService } from './../../service/viewcalendar.service';
import { PatientApiService } from './../../service/patient-api.service';
import { Attendant } from './../../model/attendant';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TargetService } from '@services/target.service';
declare const getFingerprint: any;
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
} from 'ng-apexcharts';
import { UserService } from '@services/user.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {BackendResponse} from "@model/backendResponse";

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
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  NeedToDelivers;
  donor =0;
  patient=0;
  salon=0;
  driver=0;
  attendant=0;
  manager=0;
  jan1 = 0;
  jan2 = 0;
  feb1 = 0;
  feb2 = 0;
  mar1 = 0;
  mar2 = 0;
  apr1 = 0;
  apr2 = 0;
  may1 = 0;
  may2 = 0;
  jun1 = 0;
  jun2 = 0;
  jul1 = 0;
  jul2 = 0;
  aug1 = 0;
  aug2 = 0;
  sep1 = 0;
  sep2 = 0;
  oct1 = 0;
  oct2 = 0;
  nov1 = 0;
  nov2 = 0;
  dec1 = 0;
  dec2 = 0;
  assignJobs = [];



  constructor(
    private _targetService: TargetService,
    private userService: UserService,
    private patientApiService:PatientApiService,
    private viewCalendarService:ViewCalendarService,
    private _http: HttpClient
  ) {


    this.chartOptions = {
      series: [
        {
          name: 'patient request',
          // tslint:disable-next-line: max-line-length
          data: [this.jan1, this.feb1, this.mar1, this.apr1, this.may1, this.jun1, this.jul1, this.aug1, this.oct1, this.sep1, this.oct1, this.nov1, this.dec1]
        },
        {
          name: 'donation',
          // tslint:disable-next-line: max-line-length
          data: [this.jan2, this.feb2, this.mar2, this.apr2, this.may2, this.jun2, this.jul2, this.aug2, this.oct2, this.sep2, this.oct2, this.nov2, this.dec2]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      yaxis: {
        title: {
          text: 'wigs count '
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return 'wigs count : ' + val;
          }
        }
      }
    };
    this.loadChart();
    this.userService.getUsers().subscribe(
      data => {
        data['data'].forEach(e=>{
          if (e.active){
            if (e.role === 'donor') {
              this.donor++
            } else if (e.role === 'patient') {
              this.patient++
            } else if (e.role === 'salon') {
              this.salon++
            } else if (e.role === 'driver') {
              this.driver++
            } else if (e.role === 'attendant') {
              this.attendant++
            } else if (e.role === 'manager') {
              this.manager++
            }
          }
        })
      },
      error => {
        console.error(error);
      }
    )
    console.log(getFingerprint());
    this._targetService.getAllSalonNeedToDelivers().subscribe( data => {
      this.NeedToDelivers = data['data']
    })
  }

  async ngOnInit(): Promise<void> {
    try{
      const res =  await this._http.get(`${environment.BASE_URL}/targets/all`).toPromise() as BackendResponse

      if(res.success){
        console.log(res.data)
        res.data.map(r => {
          const totalJobs = r.targets.length;
          const completedJobs = r.targets.filter( d => {
            return d.status === 'Delivered'
          }).length
          console.log(r.driverEmail)
          console.log(totalJobs)
          console.log(completedJobs)
          let completed = 0
          if(completedJobs !== 0){
            completed = (totalJobs/completedJobs)*100
          }

          if(totalJobs !== 0){
            this.assignJobs.push({
              driver: r.driverEmail.split('@')[0],
              // phoneNumber: 'opewf',
              completed
            })
          }
        })
      }

      console.log(this.assignJobs)

    }catch (error){
      console.log(error)
      console.log('failed to fetch')
    }

  }


  loadChart(){
    this.patientApiService.getPatients().subscribe(
      data => {
        data['data'].forEach(e => {
          if (e.lastRequest.canceled === false) {
            if (new Date().getFullYear() === new Date(e.lastRequest.requestDay).getFullYear()) {
              console.log(new Date(e.lastRequest.requestDay).getMonth())
              console.log(e.lastRequest.requestDay)
              if (new Date(e.lastRequest.requestDay).getMonth() === 0) {
                this.jan1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 1) {
                this.feb1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 2) {
                this.mar1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 3) {
                this.apr1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 4) {
                this.may1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 5) {
                this.jun1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 6) {
                this.jul1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 7) {
                this.aug1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 8) {
                this.sep1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 9) {
                this.oct1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 10) {
                this.nov1++
              } else if (new Date(e.lastRequest.requestDay).getMonth() === 11) {
                this.dec1++
              }
            }

          }
        })
        this.chartOptions = {
          series: [
            {
              name: 'patient request',
              // tslint:disable-next-line: max-line-length
              data: [this.jan1, this.feb1, this.mar1, this.apr1, this.may1, this.jun1, this.jul1, this.aug1, this.oct1, this.sep1, this.oct1, this.nov1, this.dec1]
            },
            {
              name: 'donation',
              // tslint:disable-next-line: max-line-length
              data: [this.jan2, this.feb2, this.mar2, this.apr2, this.may2, this.jun2, this.jul2, this.aug2, this.oct2, this.sep2, this.oct2, this.nov2, this.dec2]
            }
          ],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          },
          yaxis: {
            title: {
              text: 'wigs count '
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return 'wigs count : ' + val ;
              }
            }
          }
        };
      }
    )
    this.viewCalendarService.getAll().subscribe(
      data => {
        console.log(data)
        data['data'].forEach(e => {
          if (e.complete === true) {
            if (new Date().getFullYear() === new Date(e.appointmentDate).getFullYear()) {
              if (new Date(e.appointmentDate).getMonth() === 0) {
                this.jan2++
              } else if (new Date(e.appointmentDate).getMonth() === 1) {
                this.feb2++
              } else if (new Date(e.appointmentDate).getMonth() === 2) {
                this.mar2++
              } else if (new Date(e.appointmentDate).getMonth() === 3) {
                this.apr2++
              } else if (new Date(e.appointmentDate).getMonth() === 4) {
                this.may2++
              } else if (new Date(e.appointmentDate).getMonth() === 5) {
                this.jun2++
              } else if (new Date(e.appointmentDate).getMonth() === 6) {
                this.jul2++
              } else if (new Date(e.appointmentDate).getMonth() === 7) {
                this.aug2++
              } else if (new Date(e.appointmentDate).getMonth() === 8) {
                this.sep2++
              } else if (new Date(e.appointmentDate).getMonth() === 9) {
                this.oct2++
              } else if (new Date(e.appointmentDate).getMonth() === 10) {
                this.nov2++
              } else if (new Date(e.appointmentDate).getMonth() === 11) {
                this.dec2++
              }
            }
          }
        })
        this.chartOptions = {
          series: [
            {
              name: 'Patient Request',
              // tslint:disable-next-line: max-line-length
              data: [this.jan1, this.feb1, this.mar1, this.apr1, this.may1, this.jun1, this.jul1, this.aug1, this.oct1, this.sep1, this.oct1, this.nov1, this.dec1]
            },
            {
              name: 'Donation',
              // tslint:disable-next-line: max-line-length
              data: [this.jan2, this.feb2, this.mar2, this.apr2, this.may2, this.jun2, this.jul2, this.aug2, this.oct2, this.sep2, this.oct2, this.nov2, this.dec2]
            }
          ],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          },
          yaxis: {
            title: {
              text: 'wigs count'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return 'wigs count : ' + val  ;
              }
            }
          }
        };
      }
    )

  }
}
