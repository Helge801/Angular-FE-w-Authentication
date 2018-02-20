import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user : User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    console.log("reset form was called");
    if(form != null)
      form.reset();
      this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  OnSubmit(form : NgForm){
    console.log("submitting form");
    this.userService.registerUser(form.value)
    .subscribe((data:any) => {
      if (data.Succeeded == true) {
        console.log('considered successful');
        this.resetForm();
        this.toastr.success('User registration successful');
      } else {
        console.log("considered failed");
        this.toastr.error(data.Errors[0]);
      }
    });
  }

}
