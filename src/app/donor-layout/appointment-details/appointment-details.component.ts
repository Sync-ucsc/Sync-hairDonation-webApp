import { Component, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
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


//add, update and delete component
@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})


export class AppointmentDetailsComponent implements OnInit, OnDestroy{

  socket = io('http://127.0.0.1:3000/donorAppointment');

  showModal: boolean;
  deleteAppointmentSub;
  getAllSub;
  createAppointmentSub;
  createAppointment1Sub;
  updateAppointmentSub;
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
    private renderer: Renderer2,
    private _ViewCalendarService: ViewCalendarService,
  ) {
  }

  ngOnInit() {
    this.getall();
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
      console.log(arg)

      let appointment = {
              DonorRequest: true,
              Donoremail: '' ,
              systemRequestDate:'2020.07.17',
              appointmentDate: this.arg.date,
              appointmentTimeSlot:this.arg.dateStr
         }
       
    this.createAppointmentSub = this._ViewCalendarService.createAppointment(appointment).subscribe(
          data => {
            Swal.fire(
              'Done!',
              'You added a new appointment!',
              'success'
            )
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


  }

  getall(){
    this.getAllSub = this._ViewCalendarService.getAll().subscribe(
      data => {
        console.log(data)
        data.data.forEach(element => {

          const event = {
            title: element.customerName,
            start: element.appointmentTimeSlot.split('+')[0],
            id: element._id,
          }
          console.log(element)
          this.calendarEvents = this.calendarEvents.concat(event)
          this.calendarEvents.concat(event)
          console.log(this.calendarEvents)

          // this.calendar.getApi().addEvent(event);

          //  this.calendarEvents;
        });

      }
    )
  }


  // onSubmit() {
   
  //   this.submitted = true;
  //   const formValue = this.addForm.value;
  //   console.log(formValue)

  //   // clear form values
  //   this.formGroupDirective.resetForm()

  //   // tslint:disable-next-line: prefer-const
  //   let appointment = {
  //       SalonEmail: 'mailtochamodij@gmail..com',
  //       DonorRequest: false,
  //       Donoremail: '' ,
  //       customerEmail: 'chamo@gmail.com' ,
  //       customerNumber: formValue.mobile,
  //       customerName: formValue.name,
  //       systemRequestDate:'2020.07.17',
  //       appointmentDate: this.arg.date,
  //       appointmentTimeSlot:this.arg.dateStr
  //  }
 
  //  this.createAppointmentSub = this._ViewCalendarService.createAppointment(appointment).subscribe(
  //   data => {
  //     Swal.fire(
  //       'Done!',
  //       'You added a new appointment!',
  //       'success'
  //     )
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


  // if (!this.addForm.valid) {
  //   return false;
  // } else {
  // }
  // }






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

  // get yearMonth(): number {
  //   const dateObj = new Date();
  //   console.log(dateObj.getUTCMonth() + 1);
  //   this.date=dateObj.getUTCMonth() + 1;
  //   return (dateObj.getUTCMonth() + 1);
  //   //return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);

  // }


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

  // deleteAppointment(event) {

  //   if (event.jsEvent.srcElement.className === 'delete-icon') {
  //     console.log('delete-icon')
  //     console.log(event.event)
  //     const id = (event.event.id) ? event.event.id : event.event._def.id;
  //     console.log(id)
  //     this._ViewCalendarService.deleteAppointment(id).subscribe(
  //       data => {
  //         if (data) {
  //           event.event.remove();
  //         }
  //       }
  //     )
  //   }
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


}
