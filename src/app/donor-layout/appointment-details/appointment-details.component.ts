
import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
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
export class AppointmentDetailsComponent implements OnInit {
  socket = io('http://localhost:3000/donorAppointment');

  
  
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
    {title: 'Event Now', start: '2020-07-03T16:00:00'},
    {title: 'Event Now', start: '2020-07-03T16:00:00'},
    {
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

  constructor(private renderer:Renderer2,
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
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // })

    // swalWithBootstrapButtons.fire({
    //   title: 'Add Appointment',
      // text: "Are you want to add appointment?",
      // input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, add it!',
    //   cancelButtonText: 'No, cancel!',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.value) {
    //     swalWithBootstrapButtons.fire(
    //       'Add!',
    //       'Your appointment is  added.',
    //       'success'
    //     )
    //   } else if (
        /* Read more about handling dismissals below */
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     swalWithBootstrapButtons.fire(
    //       'Cancelled',
    //       'Your appointment is not added.',
    //       'error'
    //     )
    //   }
    // })
 // }
  //}

  getall(){
   
  }


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

    this._ViewCalendarService.createAppointment(date).subscribe(
      data => {
       if (data.success) {
          event.event.setProp('id', data.task.id);
       }
       }
     )

  }
 
  updateAppointment(event) {
  

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
      this._ViewCalendarService.deleteAppointment(event.event.id).subscribe((data) => {
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
}
 // customButtons: {
      //   prev:{
      //     click: function () {
      //       const dateObj = new Date();
      //       //console.log(dateObj.getUTCMonth() + 1);
      //       this.date=dateObj.getUTCMonth() + 1;
      //       //this.n++;
      //       //return (dateObj.getUTCMonth() + 1);
      //       console.log(  this.date-1)
      //     }
      //   },
      //   next:{
      //     click: function () {
      //       const dateObj = new Date();
      //       //console.log(dateObj.getUTCMonth() + 1);
      //       this.date=dateObj.getUTCMonth() + 1;
      //       //this.n++;
      //       //return (dateObj.getUTCMonth() + 1);
      //       console.log(  this.date+1)
      //     }
      //   },
      // },

       // updateHeader() {
  //   this.options.header = {
  //     left: 'prev,next',
  //     center: 'title',
  //     right: ''
  //   };
  // }
  // updateEvents() {
  //   this.eventsModel = [{
  //     title: 'Updaten Event',
  //     start: this.yearMonth + '-08',
  //     end: this.yearMonth + '-10'
  //   }];
  //   console.log(this.eventsModel);

  // }
