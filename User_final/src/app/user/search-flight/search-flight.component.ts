import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/Booking';
import { BookingService } from 'src/app/Service/booking.service';
import { Flight } from '../Flight';
import { sFlight } from '../sFlight';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  source:string='';
  destination:string='';
  departureDate: string='';
  travelClass: string='';
  sf:any;

  userId: any;
  flightId: any;
  searchFlight: FormGroup;
  passengerForm: FormGroup;
  flightList: Flight[]=[];
  flightSearched: boolean = true;
  b2:Booking;
  submitted: boolean = false;
  b1:any
   = {
    bookingId: 0, travelClass: '', bookingDate: '', bookingStatus: '', noOfPassengers: 0, totalCost: 0, refundAmount: 0,
    user: { userId: 0, email: '', password: '', title: '', firstName: '', LastName: '', phoneNumber: 0, dob: '' },
    flight: {
      flightId: 0, adminId: 0, flightName: '', source: '', destination: '', departureDate: '', departureTime: '', arrivalDate: '', arrivalTime: '', economicSeats: 0, economyCost: 0, eSeatsBooked: 0, bSeatsBooked: 0, businessSeats: 0, businessCost: 0
    }

  };

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router) {
    this.userId = sessionStorage.getItem("userId");
    this.flightId = sessionStorage.getItem("flightId");
    console.log("userId:" + sessionStorage.getItem("userId"));
    console.log("flightId:" + sessionStorage.getItem("flightId"));
    
  }

  ngOnInit(): void {

    this.searchFlight = this.formBuilder.group({

      source: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      noOfPassengers: ['', Validators.required],
      travelClass: ['', Validators.required],

    });
    

  }


  onSearch()
  {
    // this.sf.source=this.source;
    // this.sf.destination=this.destination;
    // this.sf.departureDate=this.departureDate;
    // this.sf.travelClass=this.travelClass;
    if(this.searchFlight.invalid)
    {
     
      alert("Please enter all the fields");
      
    }
    else{
    this.sf={
      "source":this.searchFlight.value.source,
      "destination":this.searchFlight.value.destination,
      "departureDate":this.searchFlight.value.departureDate,
      "travelClass":this.searchFlight.value.travelClass,
      "noOfPassengers":this.searchFlight.value.noOfPassengers
    }


    console.log(this.sf);

    this.bookingService.searchFlight1(this.sf).subscribe((data: any) =>{
      // this.router.navigateByUrl("displayFlights");
      this.flightList = data;
      this.flightSearched=!this.flightSearched;
      console.log(this.sf);
      console.log("flight list");
      console.log(this.flightList);
      localStorage.setItem('noOfPassengers',this.searchFlight.value.noOfPassengers);
      

      
    });
  }
}

  onSubmit() {
    console.log("SUBMIT");
    // if (this.passengerForm.invalid) {
    //   return;
    // }
  
  //   this.bookingService.addPassenger(this.passengerForm.value).subscribe(data => {
  //   //this.userForm.reset(this.userForm.value);
  //   //(<HTMLFormElement>document.getElementById("Login")).reset();
  //   // this.userForm.reset();
  //  //this.router.navigate(['makePayment']);
  
  //   }
  
  //   );
   }

  getDetails(flightId:number){
    if(this.searchFlight.invalid)
    {
      this.searchFlight.reset();
      
    }
    this.userId = localStorage.getItem('userId')
    this.flightId = flightId;
    this.b1 = {
      "travelClass":this.searchFlight.value.travelClass,
      "bookingDate":"",
      "bookingStatus":"not confirmed",
      "noOfPassengers":this.searchFlight.value.noOfPassengers,
      "totalCost": 0,
      "refundAmount":0,
      "user": {
        "userId": this.userId,
        "email": "",
        "password": "",
        "title": "",
        "firstName": "",
        "lastName": "",
        "phoneNumber": 0,
        "dob": ""
    },
    "flight": {
      "flightId": this.flightId,
      "adminId": 0,
      "flightName": "",
      "source": "",
      "destination": "",
      "departureDate": "",
      "departureTime": "",
      "arrivalDate": "",
      "arrivalTime": "",
      "economicSeats": 0,
      "businessSeats": 0,
      "economyCost": 0,
      "businessCost": 0,
      "eSeatsBooked": 0,
      "bSeatsBooked": 0
  }

      }
 
    console.log(this.b1);
    localStorage.setItem('flightId',this.flightId);

    this.bookingService.addBooking(this.b1).subscribe((data:any)=>
    {this.b2 = data
      console.log(this.b2);
 

    
   
    });
    localStorage.setItem('bookingId',this.b2.bookingId.toString());
    localStorage.setItem('totalCost', this.b2.totalCost.toString());
    console.log(localStorage.getItem('bookingId'));
    this.router.navigateByUrl("passengers")
      
      
      
  }





}
