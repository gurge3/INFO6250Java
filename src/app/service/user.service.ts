import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getUsers = function (): Observable<any[]> {
    let url = "http://localhost:8086/user/";
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  };

  addUser = function (value): Observable<any[]> {
    let url = "http://localhost:8086/user/";
    console.log(value);
    return this.http.post(url, { "username": value.userName, "password": value.userPassword, "roleId": 24 })
      .map((response: Response) => {
        return response;
      })
      .catch((err: Response) => {
        if (err.status === 422) {
          return Observable.throw("Duplicate username");
        } else if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  };

  disableUser = function (userId, disableMessage): Observable<any[]> {
    let url = "http://localhost:8086/user/disable/";
    return this.http.post(url, { "userId": userId, "disableReason": disableMessage })
      .map((response: Response) => {
        return response;
      })
      .catch((err: Response) => {
        if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  };

  enableUser = function (userId): Observable<any[]> {
    let url = "http://localhost:8086/user/enable/";
    return this.http.post(url, { "userId": userId })
      .map((response: Response) => {
        return response;
      })
      .catch((err: Response) => {
        console.log(err);
        if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  };

  deleteUser = function (userId): Observable<any[]> {
    console.log(userId);
    let url = "http://localhost:8086/user/" + userId;
    return this.http.delete(url)
      .map((response: Response) => {
        return response;
      })
      .catch((err: Response) => {
        console.log(err);
        if (err.status === 422) {
          return Observable.throw("Invalid operation");
        } else if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  };

  editUser = function (user): Observable<any[]> {
    let url = "http://localhost:8086/user/";
    return this.http.put(url, user)
      .map((response: Response) => {
        return response;
      })
      .catch((err: Response) => {
        console.log(err);
        if (err.status === 422) {
          return Observable.throw("Invalid operation");
        } else if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  };
}
