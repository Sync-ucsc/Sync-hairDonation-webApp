
import { TokenService } from './../../service/token.service';
import { Component, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
import { ViewCalendarService } from '@services/viewcalendar.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-close-date-update',
  templateUrl: './close-date-update.component.html',
  styleUrls: ['./close-date-update.component.scss']
})
export class CloseDateUpdateComponent implements OnInit {

  socket = io('http://127.0.0.1:3000/donorAppointment');

  showModal: boolean;
  addForm: FormGroup;
  submitted = false;
  deleteAppointmentSub;
  getAllSub;
  createAppointmentSub;
  createAppointment1Sub;
  updateAppointmentSub;

  // use for clear formFiled
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  options: any;
  event: any;
  eventsModel: any;
  n: number;
  date: number;
  @ViewChild('calendar', { static: false }) calendar: FullCalendarComponent;

  // the #calendar in the template
  calendarVisible = true;
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    {
      title: 'Salon closed ',
      start: '2020-07-05T10:00:00',
      end: '2020-07-05T13:00:00',
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
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private _ViewCalendarService: ViewCalendarService,
    private tokenService: TokenService
  ) {
    this.taskForm = fb.group({
      taskName: ['']
    });
  }

  ngOnInit() {
    this.getall();
    this.addForm = this.fb.group({
      name: [' ', [Validators.required]],
      mobile: [' ', [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/), Validators.minLength(10)]]
    });
    this.options = {
      editable: true,

      // customButtons: {

      //   prev: {
      //     click () {
      //       const dateObj = new Date();
      //       this.date = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth());
      //       console.log(this.date)
      //     }
      //   },
      //   next: {
      //     click () {
      //       const dateObj = new Date();
      //       this.date = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 2);
      //       console.log(this.date)
      //     }
      //   },
      // },

      header: {
        left: 'prev,next today ',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGrigPlugin]

    }
    console.log(this.options);

  }



  handleDateClick(arg) {
   
    if (!this.isAnOverlapEvent(arg.dateStr.split('+')[0], arg.dateStr.split('+')[0].substring(0, 11)
      + this.increese(arg.dateStr.split('+')[0].substring(11, 13))
      + arg.dateStr.split('+')[0].substring(13, 19))) {
         console.log(arg.dateStr.split('+')[0].substring(0, 11)
      + this.increese(arg.dateStr.split('+')[0].substring(11, 13))
      + arg.dateStr.split('+')[0].substring(13, 19))
      Swal.fire({
        title: 'Are you sure?',
        text: `Appointment will be Submited`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Submit it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        preConfirm: (login) => {
          if (!arg.allday) {

            this.arg = arg;
            console.log(arg)
            let appointment = {
              SalonEmail: this.tokenService.getEmail(),
              DonorRequest: false,
              Donoremail: 'Salon closed',
              customerEmail: '',
              systemRequestDate: new Date(),
              appointmentDate: arg.date,
              appointmentTimeSlot: arg.dateStr,
              endTime: arg.dateStr.split('+')[0].substring(0, 11)
                + this.increese(arg.dateStr.split('+')[0].substring(11, 13))
                + arg.dateStr.split('+')[0].substring(13, 19) +'+05:30'
            }

            this.createAppointmentSub = this._ViewCalendarService.createCloseTime(appointment).subscribe(
              data => {
                // Swal.fire(
                //   'Done!',
                //   'You added a new appointment!',
                //   'success'
                // )
                this.showModal = false;
                this.calendarEvents = [];
                console.log(data)
                this.getall();
              },
              error => {
                console.log(error)
                Swal.fire(
                  'Error!',
                  'Error!',
                  'error'
                )
                this.showModal = false;
              },
            );

            // this.calendarEvents = this.calendarEvents.concat({
            //   title: 'fff',
            //   start: arg.dateStr,
            //   id: 'dddddd'
            // })
            // console.log(arg)

            // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            //   this.event = prompt('Enter Event', '')
            //   console.log(this.event)
            //   this.calendarEvents = this.calendarEvents.concat({
            //     title: this.event,
            //     start: arg.date,
            //     allDay: arg.allDay
            //   })
            // }

          }
        },
      }).then(function (result) {
        if (result.value) {
          Swal.fire(
            'submit!',
            'Appointment has been submit.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Appointment was not submit',
            'error'
          )
        }
      });
      this.getall();
    }


    }

  getall() {
    this.calendarEvents = [];
    this.getAllSub = this._ViewCalendarService.getAll().subscribe(
      data => {
        console.log(data)
        data.data.forEach(element => {
          let event1;
          if (element.salonEmail === this.tokenService.getEmail()) {
            if (element.Donoremail === 'Salon closed') {
              event1 = {
                title: element.customerName,
                start: element.appointmentTimeSlot.split('+')[0],
                end: element.endTime.split('+')[0],
                id: element._id,
              }
              this.calendarEvents = this.calendarEvents.concat(event1)
              this.calendarEvents.concat(event1)
            } else if (element.canceled === false) {
              event1 = {
                title: 'Salon closed ',
                start: element.appointmentTimeSlot.split('+')[0],
                end: element.appointmentTimeSlot.split('+')[0].substring(0, 11)
                  + this.increese(element.appointmentTimeSlot.split('+')[0].substring(11, 13))
                  + element.appointmentTimeSlot.split('+')[0].substring(13, 19),
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

  increese(x) {
    x = (+x) + 1;
    let y
    if (x < 10) {
      y = '0' + x;
    } else {
      y = x + ''
    }
    return y;

  }

  createAppointment(event) {
    console.log(event.event)
    console.log('hi')
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
    if (event.delta !== undefined) {
      data = event.delta;
      date = event
      let ydate = new Date(date.oldEvent.end)
      let pdate = new Date(date.oldEvent.start)
      if (data.milliseconds !== 0) {
        pdate.setMilliseconds(data.milliseconds + pdate.getMilliseconds());
        ydate.setMilliseconds(data.milliseconds + ydate.getMilliseconds());
      }
      if (data.days !== 0) {
        pdate.setDate(data.days + pdate.getDate())
        ydate.setDate(data.days + ydate.getDate())
      }
      if (data.months !== 0) {
        pdate.setMonth(data.months + pdate.getMonth());
        ydate.setMonth(data.months + ydate.getMonth());
      }
      if (data.years !== 0) {
        pdate.setFullYear(data.years + pdate.getFullYear());
        ydate.setMonth(data.months + ydate.getMonth());
      }
      pdate.setMilliseconds(pdate.getMilliseconds() + 5.5 * 60 * 60 * 1000)
      ydate.setMilliseconds(ydate.getMilliseconds() + 5.5 * 60 * 60 * 1000)
      let xdate = new Date();
      xdate.setHours(0)
      xdate.setDate(0 + xdate.getDate());
      if (new Date(pdate.toISOString().substring(0, 19) + '+05:30') > new Date(xdate.toISOString())) {
        if (!this.isAnOverlapEvent(pdate.toISOString().substring(0, 19), ydate.toISOString().substring(0, 19))) { 
          Swal.fire({
            title: 'Are you sure?',
            text: `Salon will be updated permanently`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            preConfirm: (login) => {

              this.updateAppointmentSub = this._ViewCalendarService.updateCloseTime(
                { id: event.event.id, startTime: pdate.toISOString().substring(0, 19) + '+05:30', endTime: ydate.toISOString().substring(0, 19) + '+05:30' }
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
    console.log(event.event);
    if (event.event.title !== 'Salon closed ') {
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
            if (!data.msg)
              Swal.showValidationMessage(
                `Request failed`
              )
          }
          )

        },
      }).then(function (result) {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Appointment has been deleted.',
            'success'
          )
          event.event.remove();
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

  resize(event){
    console.log()
    let end = new Date(event.event.end.setHours(5 + event.event.end.getHours()))
    let start = new Date(event.event.start.setHours(5 + event.event.start.getHours()))
    Swal.fire({
      title: 'Are you sure?',
      text: `Salon will be updated permanently`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      preConfirm: (login) => {

        this.updateAppointmentSub = this._ViewCalendarService.updateCloseTime(
    // tslint:disable-next-line: max-line-length
          { id: event.event.id, startTime: new Date(start.setMinutes(30 + event.event.start.getMinutes())).toISOString().substring(0, 19) + '+05:30', endTime: new Date(end.setMinutes(30 + event.event.end.getMinutes())).toISOString().substring(0, 19) + '+05:30'}
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
  }


}
