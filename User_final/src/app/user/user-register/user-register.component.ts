import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Service/user.service';
import { ConfirmPasswordValidator } from '../confirm-password.validation';
import { User } from '../User';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user:User = new User();
  submitted:boolean = false;
  userForm: FormGroup;

  msg:string;
  
  
  constructor(private userService:UserService, private formBuilder: FormBuilder, private router:Router) { }



  ngOnInit() {
    this.userForm = this.formBuilder.group({
      title:['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required, Validators.minLength(8)],
      confirmPassword: ['',Validators.required, Validators.minLength(8)],
      email: ['',[Validators.required, Validators.email]],
      phoneNumber:['',Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      dob:['',Validators.required]
      
      
  },

  {
    validator: ConfirmPasswordValidator("password", "confirmPassword")
  },
    );



}
 

onSubmit() {
  console.log("SUBMIT");
  this.submitted = true;
  if (this.userForm.invalid){
    return;
  }

  this.userService.createUser(this.userForm.value).subscribe((data:any) => {
    this.msg = data;
    console.log("here");
    
  });
  
  this.userForm.reset()
 this.router.navigateByUrl("userLogin")
}

public goBack()
{
  console.log("inside go back");
   this.router.navigate(['/userLogin']);
}


}




