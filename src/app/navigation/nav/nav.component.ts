import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      this.isLoggedIn = true;
      console.log(user);
      if (user.roleName === "admin") {
        this.isAdmin = true;
      }
    }
  }

  logOut() {
    console.log("logging out");
    this.authenticationService.logOut();
  }

}
