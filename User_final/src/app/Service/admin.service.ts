import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = "http://localhost:8090/api/v1";
  constructor(private http:HttpClient) { }

  
  getAllFlights()
  {
    return this.http.get<any[]>(this.baseUrl+"/flights");
  }

  loginAdmin(email:String, password:String)
  {
    return this.http.get("http://localhost:8090/api/v1/admin/"+email+"/"+password);
  }
}
