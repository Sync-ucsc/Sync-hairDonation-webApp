import { TokenService } from './../../service/token.service';
import {Component, OnInit,  ViewChild, ElementRef, Inject} from '@angular/core';
import { MatDialog ,MatDialogConfig,MAT_DIALOG_DATA} from '@angular/material/dialog';
import  { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule,  FormGroupDirective, NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
// services
import { PatientApiService } from './../../service/patient-api.service';
// interface
import {DbWigRequest} from '@model/database/dbWigRequest';
import {BackendResponse} from '@model/backendResponse';

import { Router } from '@angular/router';
declare function getFingerprint(): any;
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from '@services/user.service';
import { FingerprintService } from '@services/fingerprint.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';




export interface DialogData {
    animal:any;
}


@Component({
  selector: 'app-manual-request',
  templateUrl: './manual-request.component.html',
  styleUrls: ['./manual-request.component.scss']
})
export class ManualRequestComponent implements OnInit {

  user = {
    fname: '',
    lname: '',
    email: '',
    nic: '',
    phone: '',
    address: '',
    password: '',
    role: 'patient',
    fingerprint: 0,
    fpcount: 0,
    patientNumber: '',
    patientReport: ''
  }
  user1 = {
    fname: '',
    lname: '',
    email: '',
    nic: '',
    phone: '',
    address: '',
    password: '',
    role: 'patient',
    fingerprint: 0,
    fpcount: 0,
    patientNumber: '',
    patientReport: ''
  }

  myform: FormGroup;
  showDetails = true;
  matcher = new MyErrorStateMatcher();

  selectedImage: any = null;
  url: string =  null;
  id: string;
  file: string;

  btn1 = false;
  btn2 = false;
  btn3 = false;
  btn4 = false;
  btncu2 = false;
  btncu3 = false;
  btncu4 = false;



  form1 = true;
  form2 = false;
  form3 = false;
  form4 = false;
  searchElementRef: ElementRef;
  @ViewChild('search') set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.searchElementRef = content;
    }
  }


  wigsType : string;
  Types: string[] = ['Short Hair Wigs', 'Long Hair Wigs', 'Curly Hair Wigs', 'Straight Hair Wigs'];

  lastRequestData: DbWigRequest;

  manualForm = new FormGroup({
    reportId: new FormControl('', [Validators.required])
  });

  signForm1 = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  signForm2 = new FormGroup({
    nic: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(10)]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
  });
  signForm3 = new FormGroup({
    patientNumber: new FormControl('', [Validators.required]),
    patientReport: new FormControl('', [Validators.required]),
  });



  valid(){
    return !this.signForm3.valid || this.url === null
  }
  constructor(
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private fb: FormBuilder,
    private _patientService: PatientApiService,
    private _toastr: ToastrService,
    private _token: TokenService,
    private router: Router,
    private userService: UserService,
    private fingerprint: FingerprintService
  ) {
    this.user.fingerprint = getFingerprint()
    this.fingerprint.checkfp(getFingerprint()).subscribe(
      data => {
        console.log(data)
        if (data.success === true) {
          if (data.data !== '') {
            console.log(data.data);
            if (data.data.block === true && data.data.check === false) {
              this.router.navigate(['/']);
              Swal.fire(
                'Error!',
                'you can creat only limited account!',
                'error'
              )

            } else if (data.data.block === true && data.data.check === true) {
              this.user.fpcount = 1
              Swal.fire(
                'warning!',
                'you have alrady account!',
                'warning'
              )
            } else {
              this.user.fpcount = 1
              Swal.fire(
                'warning!',
                'you have alrady one account!',
                'warning'
              )
            }
          }
        } else {
          this.router.navigate(['/']);
          Swal.fire(
            'error!',
            'connection error!',
            'error'
          )
        }
      },
      error => {
        // Do something with error
        this.router.navigate(['/'])
        console.error(error);
        Swal.fire(
          'error!',
          'connection error!',
          'error'
        )
      }
    )
  }

  async ngOnInit(): Promise<void> {
    console.log(this._token.getId())
    this.lastRequestData = await this.getLastRequest()
    console.log(this.lastRequestData)
  }
  async getLastRequest(): Promise<DbWigRequest> {
    try {
      const patientreportId = this._token.getId();

      const response = await this._patientService.getLastRequest(patientreportId).toPromise() as BackendResponse;

      if (!response.success) throw new Error(response.debugMessage)
      const res = response.data as DbWigRequest;
      if (!res.wigType) return null
      return res

    } catch (error) {
      console.log(error)
    }
  }


  ismobile() {
    if (window.innerWidth < 764) {
      return true;
    } else {
      return false;
    }
  }

  changeForm(x) {
    const elm1 = document.getElementsByClassName('btn1')
    if (x === 'form1') {
      this.form1 = true;
      this.form2 = false;

      this.btn1 = false;
      this.btn2 = false;
      this.btn3 = false;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = false;
    } else if (x === 'form2') {
      if (this.signForm1.valid) {
        this.form1 = false;
        this.form2 = true;
        this.form3 = false;

        this.btn1 = true;
        this.btn2 = false;
        this.btn3 = false;
        this.btn4 = false;
        this.btncu2 = true;
        this.btncu3 = false;
        this.btncu4 = false;
      }
    } else if (x === 'form3') {
      if (this.signForm2.valid) {
        this.form2 = false;
        this.form3 = true;
        this.form4 = false;

        this.btn1 = true;
        this.btn2 = true;
        this.btn3 = false;
        this.btn4 = false;
        this.btncu2 = false;
        this.btncu3 = true;
        this.btncu4 = false;
      }

    } else if (x === 'form4') {
      this.form3 = false;
      this.form4 = true;

      this.btn1 = true;
      this.btn2 = true;
      this.btn3 = true;
      this.btn4 = false;
      this.btncu2 = false;
      this.btncu3 = false;
      this.btncu4 = true;
    }
  }

  async onSubmit(): Promise<void> {
    try {

      this.lastRequestData = await this.getLastRequest()

      if (this.lastRequestData && !this.lastRequestData.finished && !this.lastRequestData.canceled) {
        this._toastr.warning(`last request is still processing`);
        this.Types = null;
        return;
      }

      if (!this.Types) {
        this._toastr.warning(`plz select type`);
        return;
      }

      const patientreportId = this._token.getId();

      const wigRequestObject = {
        requestDay: new Date().toISOString(),
        wigType: this.wigsType,
        finished: false,
        canceled: false,
        attendantStatus: 0,
      } as DbWigRequest;


      const response = await this._patientService.createWigRequest(wigRequestObject, patientreportId).toPromise() as BackendResponse;
      if (!response.success) throw new Error(response.debugMessage)

      this.Types = null;
      this.lastRequestData = await this.getLastRequest()
      this._toastr.success(`wig request add successfully`)

    } catch (error) {
      this._toastr.warning(`fail to add wig request`)
    }

      this.user1.password = Md5.hashStr(this.user.password).toString();
      this.user1.fname = this.user.fname;
      this.user1.lname = this.user.lname;
      this.user1.email = this.user.email;
      this.user1.nic = this.user.nic;
      this.user1.phone = this.user.phone;
      this.user1.address = this.user.address;
      this.user1.fingerprint = this.user.fingerprint;
      this.user1.fpcount = this.user.fpcount;
      this.user1.patientNumber = this.user.patientNumber;
      this.user1.patientReport = this.user.patientReport;
      this.userService.adduser(this.user1).subscribe(
        data => {
          console.log(data)
          Swal.fire(
            'Done!',
            'Your Signup Successfuly!',
            'success'
          )
          Swal.fire(
            'Done!',
            'Your Signup Successfuly!',
            'success'
          )
          Swal.fire(
            'Done!',
            'Your Signup Successfuly!',
            'success'
          )

          this.router.navigate(['/patient-wait']);
        },
        error => {
          // Do something with error
          this.router.navigate(['/'])
          console.error(error);
          Swal.fire(
            'error!',
            'connection error!',
            'error'
          )
        });
    }

    showPreview(event: any) {
      this.selectedImage = event.target.files[0];
    }
    sub(){
      return this.url === null? false:true;
    }
    save() {
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.url = url;
            this.user.patientReport =url;
            console.log(this.id, this.url);
            Swal.fire(
              'Success',
              'Upload Successful',
              'success'
            )
          })
        })
      ).subscribe();
    }
  }



  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
      const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

      return (invalidCtrl || invalidParent);
    }
  }
