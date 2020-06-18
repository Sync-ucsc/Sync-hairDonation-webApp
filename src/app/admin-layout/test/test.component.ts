import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick
import * as moment from 'moment';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
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
    { title: 'Event Now', start: new Date() }
  ];
  todayDate = moment().startOf('day');
  TODAY = this.todayDate.format('YYYY-MM-DD');

  constructor(private renderer: Renderer2){

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
        right: 'dayGridMonth,timeGridWeek,timeGridDay'

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
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.event = prompt('Enter Event', '')
      console.log(this.event)
      this.calendarEvents = this.calendarEvents.concat({
        title: this.event,
        start: arg.date,
        allDay: arg.allDay
      });
      
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
    console.log('hi')
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let string = event.event.title;

    // this.tasksService.create(string, date).subscribe(
    //   data => {
    //     if (data.success) {
    //       event.event.setProp("id", data.task.id);
    //     }
    //   }
    // )

  }
  updateTask(event) {

    console.log(event)
    let id = (event.event.id) ? event.event.id : event.event._def.id;
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    // this.tasksService.update(id, date).subscribe(
    //   data => { }
    // )
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
    if (event.jsEvent.srcElement.className === 'delete-icon') {
      console.log(event.event)
      let id = (event.event.id) ? event.event.id : event.event._def.id;
      console.log(id)
      // this.tasksService.delete(id).subscribe(
      //   data => {
      //     if (data) {
      //       event.event.remove();
      //     }
      //   }
      // )
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