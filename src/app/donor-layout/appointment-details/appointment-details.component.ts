import { Component, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import {FullCalendarComponent} from '@fullcalendar/angular';
import {EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
import {ViewCalendarService} from '@services/viewcalendar.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit,OnDestroy {
  socket = io('http://localhost:3000/donorAppointment');

  showModal: boolean;
  deleteAppointmentSub;
  createAppointmentSub;
  updateAppointmentSub;
  getAllSub;
  options: any;
  event: any;
  eventsModel: any;
  n: number;
  date: number;
  @ViewChild('calendar', { static: false }) calendar: FullCalendarComponent; // the #calendar in the template


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

  constructor(
    private renderer:Renderer2,
    private _ViewCalendarService: ViewCalendarService,

    ){


  }


  ngOnInit() {
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

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg) {
    if (!arg.allday) {
      document.getElementById('imagemodal').style.display = 'block';
      this.arg = arg;
      console.log(arg)
    }



    // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   this.event = prompt('Enter Event', '')
    //   console.log(this.event)
    //   this.calendarEvents = this.calendarEvents.concat({
    //     title: this.event,
    //     start: arg.date,
    //     allDay: arg.allDay
    //   })
    // }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Add Appointment',
      // text: "Are you want to add appointment?",
      // input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Add!',
          'Your appointment is  added.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your appointment is not added.',
          'error'
        )
      }
    })
 }



          // this.calendar.getApi().addEvent(event);

          //  this.calendarEvents;


  drop() {
    alert('dropped!');
  }
  eventClick(model) {
    console.log(model);
  }

  eventDragStop(model) {
    console.log(model.event.id);
    console.log(model.event);
  }


  createAppointment(event) {
    console.log(event.event)
    console.log('hi')
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
    let date = event.event.start;
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //let string = event.event.title;

    this.createAppointmentSub = this._ViewCalendarService.createAppointment(date).subscribe(
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
            { id: event.event.id, time: pdate.toISOString().substring(0, 19) + '+05:30'}
            ).subscribe(
              (data) => {
                console.log(data);
                this.socket.emit('updateAppointment', data);
                if (!data)
                  Swal.showValidationMessage(
                    `Request failed`
                  )
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

  eventDo(event) {
    const icon = this.renderer.createElement("mat-icon");
    const close = this.renderer.createText("close");
    this.renderer.addClass(icon, 'delete-icon');
    this.renderer.appendChild(icon, close);
    this.renderer.appendChild(event.el, icon)
    this.renderer.addClass(event.el, 'text-light')
  }

//  Delete the appointment
 deleteAppointment(event) {
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
        if(!data.msg)
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


  // get yearMonth(): number {
  //   const dateObj = new Date();
  //   console.log(dateObj.getUTCMonth() + 1);
  //   this.date=dateObj.getUTCMonth() + 1;
  //   return (dateObj.getUTCMonth() + 1);
  //   //return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

  // }

  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  ngOnDestroy() {

    if (this.deleteAppointmentSub !== undefined) {
      this.deleteAppointmentSub.unsubscribe();
    }
    if (this.createAppointmentSub !== undefined) {
      this.createAppointmentSub.unsubscribe();
    }
    if (this.updateAppointmentSub !== undefined) {
      this.updateAppointmentSub.unsubscribe();
    }

  }
}
