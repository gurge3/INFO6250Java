import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  username: string = 'unknown';
  isLoggedIn: boolean = false;
  constructor() { }

  ngOnInit() : void {
    let logginUserInformation = localStorage.getItem("user");
    if (logginUserInformation !== null) {
      this.isLoggedIn = true;
      this.username = JSON.parse(logginUserInformation).username;
    } else {
      this.isLoggedIn = false;

    }
    
  }

}
