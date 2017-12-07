import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
@Injectable()
export class IdeaService {
  constructor(private http: Http) { }
  
    getAllIdeas = function (): Observable<any[]> {
      let url = "http://localhost:8086/idea/";
      return this.http.get(url)
        .map((response: Response) => {
          return response.json();
        });
    };
  
    // addIdea = function (value): Observable<Idea[]> {
    //   let url = "http://localhost:8086/idea/";
    //   console.log(value);
    //   return this.http.post(url, { "categoryName": value.categoryName})
    //     .map((response: Response) => {
    //       return response;
    //     })
    //     .catch((err: Response) => {
    //       if (err.status === 422) {
    //         // TODO: check duplicate
    //         return Observable.throw("Duplicate category name");
    //       } else if (err.status === 404) {
    //         return Observable.throw("Server not found");
    //       }
    //     });
    // };
  
    deleteIdea = function (ideaId): Observable<any[]> {
      let url = "http://localhost:8086/idea/" + ideaId;
      return this.http.delete(url)
        .map((response: Response) => {
          return response;
        })
        .catch((err: Response) => {
          console.log(err);
          if (err.status === 500) {
            return Observable.throw("There are fundings attached, could not delete");
          } else if (err.status === 404) {
            return Observable.throw("Server not found");
          }
        });
    };

    disableIdea = function (ideaId, disableMessage): Observable<any[]> {
      let url = "http://localhost:8086/idea/disable/";
      return this.http.post(url, { "ideaId": ideaId, "disableReason": disableMessage })
        .map((response: Response) => {
          return response;
        })
        .catch((err: Response) => {
          if (err.status === 404) {
            return Observable.throw("Server not found");
          }
        });
    };
  
    enableIdea = function (ideaId): Observable<any[]> {
      let url = "http://localhost:8086/idea/enable/";
      return this.http.post(url, { "ideaId": ideaId })
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
  
  
    editIdea = function (idea): Observable<any[]> {
      let url = "http://localhost:8086/idea/";
      console.log(idea);
      return this.http.put(url, idea)
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
