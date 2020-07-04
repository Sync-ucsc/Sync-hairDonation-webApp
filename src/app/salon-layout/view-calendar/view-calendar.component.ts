import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
import {MatDialogModule} from '@angular/material/dialog';
import {ViewCalendarService} from './../../service/viewcalendar.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit {
  options: any;
  event: any;
  eventsModel: any;
  n: number;
  date: number;
  @ViewChild('calendar', { static: false }) calendar: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: '2020-07-03T16:00:00' },
    {
      start: '2020-07-03T10:00:00',
      end: '2020-07-03T13:00:00',
      display: 'background',
      rendering: 'background'
    }
  ];
  todayDate = moment().startOf('day');
  TODAY = this.todayDate.format('YYYY-MM-DD');

  // constructor(private renderer: Renderer2){

  // }
  taskForm: FormGroup;
  constructor(private fb: FormBuilder,private renderer:Renderer2,private _ViewCalendarService:ViewCalendarService) {
    this.taskForm = fb.group({
      taskName: [""]
    });
  }
  get taskName() {
    return this.taskForm.get("taskName") as FormControl;
  }
  ngOnInit() {


    this._ViewCalendarService.my().subscribe(
      data=>{
        data.forEach(element => {

          let event = {
            id : element.id,
            title : element.name,
            date : element.date
          }
          this.calendar.getApi().addEvent(event);

        });

      }
    )
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

  drop() {
     alert('dropped!');
  }

  handleDateClick(arg) {

    if(!arg.allDay){
      // const swalWithBootstrapButtons = Swal.mixin({
      //   customClass: {
      //     confirmButton: 'btn btn-success',
      //     cancelButton: 'btn btn-danger'
      //   },
      //   buttonsStyling: false
      // })

      // swalWithBootstrapButtons.fire({
      //   title: 'Add Appointment',

      //    text: "Are you want to add appointment?",
        // input: 'text',
        // inputAttributes: {
        //   autocapitalize: 'off'
        // },

      //     this.event = prompt('Enter Event', '')
      //       console.log(this.event)
      // this.calendarEvents = this.calendarEvents.concat({
      //  title: this.event,
      //    start: arg.date,
        //  allDay: arg.allDay
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

      //     result.dismiss === Swal.DismissReason.cancel
      //   ) {
      //     swalWithBootstrapButtons.fire(
      //       'Cancelled',
      //       'Your appointment is not added.',
      //       'error'
      //     )
      //   }
      // })
//setitem seen eka
// var abc = prompt('Enter Title');
// var allDay = !start.hasTime && !end.hasTime;
// var newEvent = new Object();
// newEvent.title = abc;
// newEvent.start = moment(start).format();
// newEvent.allDay = false;
// $('#calendar').fullCalendar('renderEvent', newEvent);
//  if (confirm('Would you like to add appointment' + arg.dateStr + ' ?')) {

//       this.event = prompt('Enter Event', '');
//        console.log(this.event)
//       this.calendarEvents = this.calendarEvents.concat({
//  title: this.event,
//        start: arg.date,
//          allDay: arg.allDay  })
//      }
     }
  }

  eventClick(model) {
    console.log(model);
  }

  eventDragStop(model) {
    console.log(model);
  }


  createTask(event) {
    console.log(event.event)
    //console.log('hi')
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
     let date = event.event.start;
     date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
     let string = event.event.title;

     this._ViewCalendarService.create(string, date).subscribe(
      data => {
       if (data.success) {
         event.event.setProp("id", data.task.id);
       }
       }
     )

  }
  updateTask(event) {

     console.log(event)
     let id = (event.event.id) ? event.event.id : event.event._def.id;
     let date = event.event.start;
     date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

     this._ViewCalendarService.update(id, date).subscribe(
    data => { }
     )
  }

  eventDo(event) {
    const icon = this.renderer.createElement('mat-icon');
    const close = this.renderer.createText('close');
    this.renderer.addClass(icon, 'delete-icon');
    this.renderer.appendChild(icon, close);
    this.renderer.appendChild(event.el, icon)
    this.renderer.addClass(event.el, 'text-light')
  }
  deleteEvent(event) {

    if (event.jsEvent.srcElement.className == 'delete-icon') {
      console.log("delete-icon")
      console.log(event.event)
      let id = (event.event.id) ? event.event.id : event.event._def.id;
      console.log(id)
       this._ViewCalendarService.delete(id).subscribe(
         data => {
         if (data) {
           event.event.remove();
          }
         }
       )
    }
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
