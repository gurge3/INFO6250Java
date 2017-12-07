import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service'
import { Router, ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  isError: boolean = false;
  errorMessage: any;

  constructor(
    private authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.model.username, this.model.password)
    .subscribe(
      data => {
        this.router.navigate(["#/home"]);
        window.location.reload();
      }, 
      error => {
        this.isError = true;
        this.errorMessage = error;
        console.log(this.errorMessage);
      }
    );
  }

}
