import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  isError: boolean = false;
  errorMessage: any;
  roles = [{"roleId": 25, "roleName": "Startup Company"}, {"roleId": 26, "roleName": "Idea Creator"}, {"roleId": 27, "roleName": "Fund Raiser"}];

  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {}

  register() {
    if (this.model.password !== this.model.password2) {
      this.isError = true;
      this.errorMessage = "Passwords are not match";
    } else {
      this.registerService.register(this.model.username, this.model.password, this.model.firstname, this.model.lastname, this.model.dateOfBirth, this.model.email, this.model.roleId)
      .subscribe(
        data => {
          this.router.navigate(["#/home"]);
        }, 
        error => {
          this.isError = true;
          this.errorMessage = error;
          console.log(this.errorMessage);
        }
      );

    }
  }

}
