import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donoractive',
  templateUrl: './donoractive.component.html',
  styleUrls: ['./donoractive.component.scss']
})
export class DonoractiveComponent implements OnInit {

  data = {
    email:'',
    id:''
  }

  constructor(private userService: UserService, private router: Router, private activatedroute:ActivatedRoute) { 
    this.activatedroute.queryParamMap.subscribe(params => {
      this.data.email = params.get('email');
      this.data.id = params.get('id');
    });
  }

  ngOnInit(): void {
    this.userService.donorActivate(this.data).subscribe(
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

}
