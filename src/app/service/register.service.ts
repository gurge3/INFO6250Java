import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/RX'
import 'rxjs/Rx';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  register(username, password, firstname, lastname, dateOfBirth, email, roleId) {
    let registerModel = {
      "username": username,
      "password": password,
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "dob": dateOfBirth,
      "roleId": roleId
    }

    let url = "http://localhost:8086/user/";
    return this.http.post(url, registerModel)
      .map((response: Response) => {
        let confidential = {
          "username": username,
          "userRole": roleId
        }
        localStorage.setItem("user", JSON.stringify(confidential));
        return confidential;
      }).catch((err: Response) => {
        if (err.status === 422) {
          return Observable.throw("Register failed, duplicate user");
        } else if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });



  }
}
