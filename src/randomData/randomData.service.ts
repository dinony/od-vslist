import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable, throwError} from 'rxjs';

import {map, catchError} from 'rxjs/operators';

@Injectable()
export class RandomDataService {
  private _apiUrl = 'https://randomuser.me/api';

  constructor(private _http: Http) {}

  private _getData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private _handleError(error: Response|any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return throwError(errMsg);
  }

  users = (results=10, page=0, seed='abc', inc='name,email,phone,picture') => this._http.get(`${this._apiUrl}/?page=${page}&results=${results}&seed=${seed}&inc=${inc}&lego`).pipe(map(this._getData), catchError(this._handleError));
}
