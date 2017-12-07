import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/RX'
import { Router, ActivatedRoute } from "@angular/router"
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http, 
    private route: ActivatedRoute,
    private router: Router) { }

  login(username: string, password: string) {
    let authUrl = "http://localhost:8086/user/validate";
    let confidential = {
      "username": username,
      "password": password
    }
    return this.http.post(authUrl, confidential)
      .map((response: Response) => {
        localStorage.setItem("user", JSON.stringify(response.json()));
        return confidential;
      }).catch((err: Response) => {
        if (err.status === 422) {
          console.log("here");
          return Observable.throw("Invalid credential");
        } else if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  }

  logOut() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);  
    window.location.reload();  
  }

}
