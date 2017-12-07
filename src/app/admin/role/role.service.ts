import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import { Role} from './role.model';
import { AppSettings} from '../../app.setting';

import { Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class RoleService {

  private url:string = "http://localhost:8086";

  constructor(private http:Http) { }

  getRoles = function(): Observable<Role[]> {
      return this.http.get(this.url+"/role")
              .map((res:Response)=>res.json());
  }

  deleteRole = function(value:Role): Observable<Response> {
    return this.http.delete(this.url+"/role/"+value.roleId);
  }

  addRole = function(value:Role): Observable<Response> {
    return this.http.post(this.url+"/role/",value);
  }

  editRole = function(value:Role): Observable<Response> {
    return this.http.put(this.url+"/role/"+value.roleId,value);
  }
}