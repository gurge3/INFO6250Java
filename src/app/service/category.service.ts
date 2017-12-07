import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  getAllCategories = function (): Observable<any[]> {
    let url = "http://localhost:8086/category/";
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  };

  addCategory = function (value): Observable<any[]> {
    let url = "http://localhost:8086/category/";
    console.log(value);
    return this.http.post(url, { "categoryName": value.categoryName})
      .map((response: Response) => {
        return response;
      })
      .catch((err: Response) => {
        if (err.status === 422) {
          // TODO: check duplicate
          return Observable.throw("Duplicate category name");
        } else if (err.status === 404) {
          return Observable.throw("Server not found");
        }
      });
  };

  deleteCategory = function (categoryId): Observable<any[]> {
    let url = "http://localhost:8086/category/" + categoryId;
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

  editCategory = function (category): Observable<any[]> {
    let url = "http://localhost:8086/category/";
    return this.http.put(url, category)
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
