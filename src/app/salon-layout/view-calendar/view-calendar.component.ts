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
  @ViewChild('calendar', {static: false}) calendar: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    {title: 'Event Now', start: '2020-07-03T16:00:00'},
    {title: 'Event Now', start: '2020-07-03T16:00:00'},
    {
      start: '2020-07-03T10:00:00',
      end: '2020-07-03T13:00:00',
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
  TODAY = this.todayDate.format('YYYY-MM-DD');

  // constructor(private renderer: Renderer2){

  // }
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

  ngOnInit() {
    this.addForm = this.fb.group({
      name: [' ', [Validators.required, Validators.minLength(6)]],
      mobile: [' ', [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/), Validators.minLength(10)]]
    });

    this._ViewCalendarService.my().subscribe(
      data => {
        data.forEach(element => {

          const event = {
            id: element.id,
            title: element.name,
            date: element.date
          }
          this.calendar.getApi().addEvent(event);

          //  this.calendarEvents;
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
    document.getElementById('imagemodal').style.display = 'block';
    this.calendarEvents = this.calendarEvents.concat({
      // title: this.name,
      name: this.onSubmit(),
      start: arg.date,
      allDay: arg.allDay
    })


    // 'show()';
    // console.log(this.event);
    //  swal({
    //         title: 'Add Appointment',
    //         html:
    //             '<input id=" swal-input1" class="wal2-input">'+
    //             '<input id="swal-input2" class=" swal2-input " >',
    //         focusConfirm: false,
    //         preConfirm: ()=>{
    //           return [
    //             document.getElementById('swal-input1').value,
    //             document.getElementById('swal-input2').value
    //           ]
    //         }
    //       })

    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // })

    // swalWithBootstrapButtons.fire({
    //   title: 'Add Appointment',
    // text: "Add customer  Name:<input type ='text'> <br> Add  Customer Phone Number :<input type = 'telephone'>",

    //   input: 'text',

    //   inputPlaceholder: "hjchkk",

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


    // if (confirm('Would you like to add appointment' + arg.dateStr + ' ?')) {
    //   this.event = prompt('Enter Event', '');
    //   console.log(this.event);
//     this.calendarEvents = this.calendarEvents.concat({
//  title: this.event,
//       start: arg.date,
//         allDay: arg.allDay
// })

  }

  eventClick(model) {
    console.log(model);
  }

  eventDragStop(model) {
    console.log(model);
  }

  createTask(event) {
    console.log(event.event)
    // console.log('hi')
    // console.dir(this.calendar.element.nativeElement.querySelector(".fc-event"))
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    const string = event.event.name;

    //  this._ViewCalendarService.create(string, date).subscribe(
    //   data => {
    //    if (data.success) {
    //      event.event.setProp("id", data.task.id);
    //    }
    //    }
    //  )

  }

  updateTask(event) {

    console.log(event)
    const id = (event.event.id) ? event.event.id : event.event._def.id;
    let date = event.event.start;
    date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    this._ViewCalendarService.update(id, date).subscribe(
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

  deleteEvent(event) {

    if (event.jsEvent.srcElement.className == 'delete-icon') {
      console.log('delete-icon')
      console.log(event.event)
      const id = (event.event.id) ? event.event.id : event.event._def.id;
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

  dayRender(ev) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  onSubmit() {

    this.submitted = true;
    const formValue = this.addForm.value;

    // clear form values
    setTimeout(() => this.formGroupDirective.resetForm(), 0);

    console.log(formValue)

    if (!this.addForm.valid) {
      return false;
    } else {

      // this._ViewCalendarService.createAppointment(this.addForm.value).subscribe(
      //    data => {
      //    console.log('Appointment succesfully added!'+data)
      Swal.fire(
        'Done!',
        'You added a new appointment!',
        'success'
      )
      // }
      // this.showModal = false;

      // );
      return name;
    }


  }

}
