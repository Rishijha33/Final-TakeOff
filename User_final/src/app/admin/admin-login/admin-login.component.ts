import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Service/admin.service';
import { Admin } from '../Admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email:String = '';
  password:String = '';
  admin:Admin=new Admin();
  bol:boolean = false;
  constructor(private adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
  }

  loginAdmin()
  {
    this.adminService.loginAdmin(this.email,this.password).subscribe((data:any)=>{
      this.admin=data;
      if(this.admin.email == this.email && this.admin.password == this.password)
      {
        localStorage.setItem('adminId',this.admin.adminId.toString());
        console.log(localStorage.getItem('adminId'));    
        this.router.navigateByUrl("admin/addFlight");
      }
      else
      {
        this.bol = true;
      }
    });
   
    
  }

}
