import * as io from 'socket.io-client';
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

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss']
})
export class ViewCalendarComponent implements OnInit {

  socket = io('http://localhost:3000/donorAppointment');

  showModal: boolean;
  addForm: FormGroup;
  submitted = false;

  // use for clear formFiled
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  options: any;
  event: any;
  eventsModel: any;
  n: number;
  date: number;
  @ViewChild('calendar', {static: false}) calendar: FullCalendarComponent;

  // the #calendar in the template
  calendarVisible = true;
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: '2020-07-05T16:00:00', id: 'ddd'},
    {
      start: '2020-07-05T10:00:00',
      end: '2020-07-05T13:00:00',
      display: 'background',
      rendering: 'background'
    },
    {
      title: 'Salon closed ',
      start: '2020-07-04T08:00:00',
      end: '2019-07-04T17.00.00',
      color: '#019efb'
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
  ) {
    this.taskForm = fb.group({
      taskName: ['']
    });
  }

  ngOnInit() {
    this.getall()
    this.addForm = this.fb.group({
      name: [' ', [Validators.required, Validators.minLength(6)]],
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
    if (!arg.allday) {
      document.getElementById('imagemodal').style.display = 'block';
      this.arg = arg;
      // this.calendarEvents = this.calendarEvents.concat({
      //   title: 'fff',
      //   start: arg.dateStr,
      //   id: 'dddddd'
      // })
      // console.log(arg)
    }


  }

  getall(){
    this._ViewCalendarService.getAll().subscribe(
      data => {
        console.log(data)
        data.data.forEach(element => {

          const event = {
            id: element.id,
            title: element.name,
            date: element.date
          }
          console.log(element)

          // this.calendar.getApi().addEvent(event);

          //  this.calendarEvents;
        });

      }
    )
  }


  onSubmit() {

    this.submitted = true;
    const formValue = this.addForm.value;

    // clear form values
    this.formGroupDirective.resetForm()

    let appointment = {

   }


    if (!this.addForm.valid) {
      return false;
    } else {

      this._ViewCalendarService.createAppointment(appointment).subscribe(
        data => {
          Swal.fire(
            'Done!',
            'You added a new appointment!',
            'success'
          )
          this.showModal = false;
          this.calendarEvents = [];
          this.getall();
        },
        error => {
          Swal.fire(
            'Error!',
            'Error!',
            'error'
          )
          this.showModal = false;
        },
      );
    }

  }

  eventDragStop(model) {
    console.log(model.event.id);
    console.log(model.event);
  }






























  get taskName() {
    return this.taskForm.get('taskName') as FormControl;
  }

  get f() {
    return this.addForm.controls;
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
    console.log(event.event)
    console.log('hi')
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const string = event.event.name;

     this._ViewCalendarService.createAppointment(date).subscribe(
      data => {
       if (data.success) {
          event.event.setProp('id', data.task.id);
       }
       }
     )

  }

  updateAppointment(event) {
    console.log('ddd')
    console.log(event)
    const id = (event.event.id) ? event.event.id : event.event._def.id;
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    this._ViewCalendarService.updateAppointment(id, date).subscribe(
      data => {
      }
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

  // get yearMonth(): number {
  //   const dateObj = new Date();
  //   console.log(dateObj.getUTCMonth() + 1);
  //   this.date=dateObj.getUTCMonth() + 1;
  //   return (dateObj.getUTCMonth() + 1);
  //   //return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

  // }

  deleteAppointment(event) {

    if (event.jsEvent.srcElement.className == 'delete-icon') {
      console.log('delete-icon')
      console.log(event.event)
      const id = (event.event.id) ? event.event.id : event.event._def.id;
      console.log(id)
      this._ViewCalendarService.deleteAppointment(id).subscribe(
        data => {
          if (data) {
            event.event.remove();
          }
        }
      )
    }
  }

  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }


}
