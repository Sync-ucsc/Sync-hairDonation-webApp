import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donoractive',
  templateUrl: './donoractive.component.html',
  styleUrls: ['./donoractive.component.scss']
})
export class DonoractiveComponent implements OnInit,OnDestroy {

  data = {
    email:'',
    id:''
  }
  donorActivateSub;
  activatedrouteSub

  constructor(private userService: UserService, private router: Router, private activatedroute:ActivatedRoute) { 
    this.activatedrouteSub = this.activatedroute.queryParamMap.subscribe(params => {
      this.data.email = params.get('email');
      this.data.id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.donorActivateSub = this.userService.donorActivate(this.data).subscribe(
      data => {
        console.log(data)
        if (data['success'] === false){
          Swal.fire(
            'error!',
            'user not found' + '!',
            'error'
          );
        } else {
          Swal.fire(
            'activate!',
            'Doner Activate!',
            'success'
          );
          this.router.navigate(['/login']);
        }
      },
      error=>{
        console.log(error)
        Swal.fire(
          'error!',
          error.error.msg+'!',
          'error'
        );
    },
    )
  }

  ngOnDestroy() {

    if (this.donorActivateSub !== undefined) {
      this.donorActivateSub.unsubscribe();
    }
    if (this.activatedrouteSub !== undefined) {
      this.activatedrouteSub.unsubscribe();
    }
  }

}
