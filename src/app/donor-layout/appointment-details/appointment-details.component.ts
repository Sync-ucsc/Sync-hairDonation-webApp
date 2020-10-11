import { TokenService } from './../../service/token.service';
import { Component, OnInit, Renderer2, ViewChild, OnDestroy, ɵConsole } from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
import {ViewCalendarService} from '@services/viewcalendar.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {PaymentService} from "@services/payment.service";

//payment
declare let payhere: any;

//add, update and delete component
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})


export class AppointmentDetailsComponent implements OnInit, OnDestroy{

  socket = io('http://127.0.0.1:3000/donorAppointment');

  showModal: boolean;
  haveAppointment = false;
  deleteAppointmentSub;
  getAllSub;
  salon;
  createAppointmentSub;
  createAppointment1Sub;
  updateAppointmentSub;
  options: any;
  event: any;
  eventsModel: any;
  n: number;
  haveSalon;
  haveTime;
  date: number;
  @ViewChild('calendar', {static: false}) calendar: FullCalendarComponent;

  // the #calendar in the template
  calendarVisible = true;
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    {
      title: 'Salon closed ',
      start: '2020-10-09T10:00:00',
      end: '2020-10-09T13:00:00',
      display: 'background',
      rendering: 'background'
    },
    {
      title: 'Salon closed ',
      start: '2020-07-11T08:00:00',
      end: '2020-07-11T17.00.00',
      display: 'background',
      rendering: 'background'
    },

  ];
  todayDate = moment().startOf('day');
  TODAY = this.todayDate.format('YYYY-MM-DD')
  arg;

  payment

  constructor(
    private renderer: Renderer2,
    private _ViewCalendarService: ViewCalendarService,
    private tokenService:TokenService,
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {

    this.route.queryParams
      .filter(params => params.salon)
      .subscribe(params => {

        this.salon = params.salon;
        console.log(this.salon)
      }
      );
  }

  ngOnInit() {

    this.getall();
    this.options = {
      editable: true,
      disableResizing: true,
      eventDurationEditable: false,
      header: {
        left: 'prev,next today ',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      eventOverlap: function (stillEvent, movingEvent) {
        return stillEvent.allDay && movingEvent.allDay;
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGrigPlugin]

    }
    console.log(this.options);
    // payment
    this.payment = {
      sandbox: true,
      merchant_id: '1215222',
      return_url: 'http://sample.com/return',
      cancel_url: 'http://sample.com/cancel',
      notify_url: 'http://sample.com/notify',
      order_id: 'ItemNo12345',
      items: 'Donation payment from' + this.tokenService.getFirstName() + ' ' + this.tokenService.getLastName(),
      amount: '70.00',
      currency: 'LKR',
      first_name: this.tokenService.getFirstName(),
      last_name: this.tokenService.getLastName(),
      email: this.tokenService.getEmail(),
      phone: this.tokenService.getPhone(),
      address: '',
      city: '',
      country: 'Sri Lanka',
      custom_1: '',
      custom_2: ''
    };



    const that = this;

    payhere.onCompleted = function onCompleted(orderId) {

      console.log('Payment completed. OrderID:' + orderId);
      console.log(that);
      that.paymentService.createPayment(that.payment).subscribe( data => {
        const appointment = {
          // aka check this salon undefined
          SalonEmail: that.salon,
          DonorRequest: true,
          Donoremail: that.tokenService.getEmail(),
          customerEmail: '',
          systemRequestDate: new Date(),
          appointmentDate: that.arg.date,
          appointmentTimeSlot: that.arg.dateStr
        }


        that.createAppointmentSub = that._ViewCalendarService.createAppointment(appointment).subscribe(
          data => {
            console.log('datadrvedgvedgvb')
            Swal.fire(
              'Done!',
              'You added a new appointment!',
              'success'
            )
            that.showModal = false;
            that.calendarEvents = [];
            console.log(data)
            that.getall();
          },
          error => {
            console.log(error)
            Swal.fire(
              'Error!',
              'Error!',
              'error'
            )
            that.showModal = false;
          },
        );
      }, error => {
        Swal.fire(
          'Error!',
          'Error!',
          'error'
        )
      })
    };

    payhere.onDismissed = function onDismissed() {
      Swal.fire(
        'Cancelled',
        'Appointment was not submit',
        'error'
      )
    };


    payhere.onError = function onError(error) {
      Swal.fire(
        'Error!',
        'Error!',
        'error'
      )
    };

  }

  handleDateClick(arg) {
    console.log(arg)
    let pdate = new Date();
    pdate.setHours(0)
    pdate.setDate(2 + pdate.getDate());
    if (new Date(arg.dateStr.split('+')[0]) > new Date(pdate.toISOString()) ) {
      // tslint:disable-next-line: max-line-length
      if (!this.isAnOverlapEvent(arg.dateStr.split('+')[0], arg.dateStr.split('+')[0].substring(0, 11)
        + this.increese(arg.dateStr.split('+')[0].substring(11, 13))
        + arg.dateStr.split('+')[0].substring(13, 19))) {
        Swal.fire({
          title: 'Are you sure?',
          text: `Appointment will be Submited`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Submit it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          preConfirm: (login) => {
            if (!arg.allday && this.haveAppointment !== true) {

              this.arg = arg;

              console.log(arg)

              payhere.startPayment(this.payment);

              // let appointment = {
              //   SalonEmail: this.salon,
              //   DonorRequest: true,
              //   Donoremail: this.tokenService.getEmail(),
              //   customerEmail: '',
              //   systemRequestDate: new Date(),
              //   appointmentDate: this.arg.date,
              //   appointmentTimeSlot: this.arg.dateStr
              // }
              // console.log(appointment)
              //
              // this.createAppointmentSub = this._ViewCalendarService.createAppointment(appointment).subscribe(
              //   data => {
              //     // Swal.fire(
              //     //   'Done!',
              //     //   'You added a new appointment!',
              //     //   'success'
              //     // )
              //     this.showModal = false;
              //     this.calendarEvents = [];
              //     console.log(data)
              //     this.getall();
              //   },
              //   error => {
              //     console.log(error)
              //     Swal.fire(
              //       'Error!',
              //       'Error!',
              //       'error'
              //     )
              //     this.showModal = false;
              //   },
              // );
              //
              // // this.calendarEvents = this.calendarEvents.concat({
              // //   title: 'fff',
              // //   start: arg.dateStr,
              // //   id: 'dddddd'
              // // })
              // // console.log(arg)
              //
              // // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
              // //   this.event = prompt('Enter Event', '')
              // //   console.log(this.event)
              // //   this.calendarEvents = this.calendarEvents.concat({
              // //     title: this.event,
              // //     start: arg.date,
              // //     allDay: arg.allDay
              // //   })
              // // }

            }

            if (this.haveAppointment === true) {
              Swal.fire(
                'Error!',
                'Allready have Appointment in ' + this.haveSalon + ' at ' + this.haveTime,
                'error'
              )
            }
          },
        }).then(function (result) {
          // if (result.value) {
          //   Swal.fire(
          //     'submit!',
          //     'Appointment has been submit.',
          //     'success'
          //   )
          // } else
          //
            if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Appointment was not submit',
              'error'
            )
          }
        });
        this.getall();
      }
    } else {
      pdate.setDate(1 + pdate.getDate());
      Swal.fire(
        'Error!',
        'You can get Appointment after ' + pdate.toISOString().substring(0,10)+' 00:00',
        'error'
      )
    }


  }

  isAnOverlapEvent(eventStartDay, eventEndDay) {
  // Events
    var events = this.calendarEvents;

  for (let i = 0; i < events.length; i++) {
    const eventA = events[i];

    // start-time in between any of the events
    if (eventStartDay > eventA.start && eventStartDay < eventA.end) {
      console.log("start-time in between any of the events")
      return true;
    }
    // end-time in between any of the events
    if (eventEndDay > eventA.start && eventEndDay < eventA.end) {
      console.log("end-time in between any of the events")
      return true;
    }
    //any of the events in between/on the start-time and end-time
    if (eventStartDay <= eventA.start && eventEndDay >= eventA.end) {
      console.log("any of the events in between/on the start-time and end-time")
      return true;
    }
  }
  return false;
}

  getall(){
    this.haveAppointment = false;
    this.calendarEvents = [];
    this.getAllSub = this._ViewCalendarService.getAll().subscribe(
      data => {
        console.log(data)
        data.data.forEach(element => {
          let event1;
          if (element.Donoremail === this.tokenService.getEmail() && element.complete === false && element.canceled === false){
            this.haveAppointment = true
            this.haveSalon = element.salonEmail.split('@')[0]
            this.haveTime = element.appointmentTimeSlot.split('+')[0]
          }
          if (element.salonEmail === this.salon){
            if (element.DonorRequest === true && element.Donoremail === this.tokenService.getEmail() && element.complete === false && element.canceled === false){
              this.haveAppointment = true;
              event1 = {
                title: element.Donoremail,
                start: element.appointmentTimeSlot.split('+')[0],
                id: element._id,
              }
              this.calendarEvents = this.calendarEvents.concat(event1)
              this.calendarEvents.concat(event1)
            } else if (element.Donoremail !== 'Salon closed' && element.canceled === false){
              event1 = {
                title: 'Booked Slot ',
                start: element.appointmentTimeSlot.split('+')[0],
                end: element.appointmentTimeSlot.split('+')[0].substring(0, 11)
                 + this.increese(element.appointmentTimeSlot.split('+')[0].substring(11, 13))
                 + element.appointmentTimeSlot.split('+')[0].substring(13,19),
                display: 'background',
                rendering: 'background',
                id: element._id,
              }
              this.calendarEvents = this.calendarEvents.concat(event1)
              this.calendarEvents.concat(event1)
            } else if (element.Donoremail === 'Salon closed'){
              event1 = {
                title: 'Salon closed ',
                start: element.appointmentTimeSlot.split('+')[0],
                end: element.endTime.split('+')[0],
                display: 'background',
                rendering: 'background',
                id: element._id,
              }
              this.calendarEvents = this.calendarEvents.concat(event1)
              this.calendarEvents.concat(event1)
            }
          }
          // event = {
          //   title: element.customerName,
          //   start: element.appointmentTimeSlot.split('+')[0],
          //   id: element._id,
          // }


          // this.calendar.getApi().addEvent(event);

          //  this.calendarEvents;
        });

      }
    )
  }




  eventDragStop(model) {
    console.log(model.event.id);
    console.log(model.event);
  }



  show() {
    this.showModal = true; // Show-Hide Modal Check

  }

  // Modal Close event
  onClick() {
    this.showModal = false;
    document.getElementById('imagemodal').style.display = 'none';
    console.log(`called me`)
    this.calendarEvents.pop()
    // document.getElementById("imagemodal").style.display="hide";
  }

  increese(x){
    x = (+x)+1;
    let y
    if( x < 10){
      y = '0'+x;
    } else{
      y = x+ ''
    }
    return y;

  }




  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  drop() {
    alert('dropped!');
  }


  eventClick(model) {
    console.log(model);
  }

  createAppointment(event) {
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    // const string = event.event.name;

     this.createAppointment1Sub = this._ViewCalendarService.createAppointment(date).subscribe(
      data => {
       if (data.success) {
          event.event.setProp('id', data.task.id);
       }
       }
     )

  }





  updateAppointment(event) {
    //console.log('ddd');
    let data;
    let date;
    if (event.delta !== undefined){
      data = event.delta;
      date = event
      let pdate = new Date(date.oldEvent.start)
      if (data.milliseconds !== 0){
        pdate.setMilliseconds(data.milliseconds + pdate.getMilliseconds());
      }
      if (data.days !== 0) {
        pdate.setDate(data.days + pdate.getDate())
      }
      if (data.months !== 0) {
        pdate.setMonth(data.months + pdate.getMonth());
      }
      if (data.years !== 0) {
        pdate.setFullYear(data.years+ pdate.getFullYear());
      }
      pdate.setMilliseconds(pdate.getMilliseconds() + 5.5*60*60*1000)
      let xdate = new Date();
      xdate.setHours(0)
      xdate.setDate(0 + xdate.getDate());
      if (new Date(pdate.toISOString().substring(0, 19) + '+05:30') > new Date(xdate.toISOString())) {
        if (!this.isAnOverlapEvent(pdate.toISOString().substring(0, 19), pdate.toISOString().substring(0, 19).substring(0, 11)
          + this.increese(pdate.toISOString().substring(0, 19).substring(11, 13))
          + pdate.toISOString().substring(0, 19).split('+')[0].substring(13, 19))) {
          Swal.fire({
            title: 'Are you sure?',
            text: `Salon will be updated permanently`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            preConfirm: (login) => {

              this.updateAppointmentSub = this._ViewCalendarService.updateAppointmentTime(
                { id: event.event.id, time: pdate.toISOString().substring(0, 19) + '+05:30' }
              ).subscribe(
                (data) => {
                  console.log(data);
                  this.socket.emit('updateAppointment', data);
                  if (!data) {
                    this.getall()
                    Swal.showValidationMessage(
                      `Request failed`
                    )
                  }

                }
              )

            },
            // tslint:disable-next-line: only-arrow-functions
          }).then(function (result) {
            if (result.value) {
              Swal.fire(
                'Updated',
                'Appointment has been updated.',
                'success'
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.getall()
              Swal.fire(
                'Cancelled',
                'Appointment was not updated',
                'error'
              )
            }
          }
          );
          } else {
            this.getall()
          }
      } else {
        pdate.setDate(1 + pdate.getDate());
        this.getall()
        Swal.fire(
          'Error!',
          'You can get Appointment after ' + pdate.toISOString().substring(0, 10) + ' 00:00',
          'error'
        )
      }

    }



  }


  //   const id = (event.event.id) ? event.event.id : event.event._def.id;
  //   let date = event.event.start;
  //   date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  //   this._ViewCalendarService.updateAppointment(id, date).subscribe(
  //     data => {
  //     }
  //   )
  // }





  eventDo(event) {
    const icon = this.renderer.createElement('mat-icon');
    const close = this.renderer.createText('close');
    this.renderer.addClass(icon, 'delete-icon');
    this.renderer.appendChild(icon, close);
    this.renderer.appendChild(event.el, icon)
    this.renderer.addClass(event.el, 'text-light')
  }




//  Delete the appointment
 deleteAppointment(event) {
   console.log(event);
   if (event.event.title === this.tokenService.getEmail()){
     console.log(event.event);
     Swal.fire({
       title: 'Are you sure?',
       text: `Appointment will be deleted permanently`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, cancel!',
       reverseButtons: true,
       preConfirm: (login) => {
         this.deleteAppointmentSub = this._ViewCalendarService.deleteAppointment(event.event.id).subscribe((data) => {
           console.log(data);
           this.socket.emit('updateAppointment', data);
           if(data.success === true){
            this.haveAppointment = false;
            this.getall();
           }
           if (!data.msg)
             Swal.showValidationMessage(
               `Request failed`
             )
         }
         )

       },
     }).then( (result) => {
       if (result.value) {
         Swal.fire(
           'Deleted!',
           'Appointment has been deleted.',
           'success'
         )
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire(
           'Cancelled',
           'Appointment was not deleted',
           'error'
         )
       }
     });


   }
}

  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  ngOnDestroy() {

    if (this.deleteAppointmentSub !== undefined) {
      this.deleteAppointmentSub.unsubscribe();
    }
    if (this.getAllSub !== undefined) {
      this.getAllSub.unsubscribe();
    }
    if (this.createAppointmentSub !== undefined) {
      this.createAppointmentSub.unsubscribe();
    }
    if (this.createAppointment1Sub !== undefined) {
      this.createAppointment1Sub.unsubscribe();
    }
    if (this.updateAppointmentSub !== undefined) {
      this.updateAppointmentSub.unsubscribe();
    }
  }

  overlap(stillEvent, movingEvent) {
  return stillEvent.allDay && movingEvent.allDay;
}


}
