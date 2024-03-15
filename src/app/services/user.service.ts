import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExchangeRateRequest } from '../interfaces/currency';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  httpToken() {

    let headers = new HttpHeaders();

    headers.set('content-type', 'application/json');
    headers.set('Accept', 'application/pdf');

    let requestOptions = { headers: headers };

    return this.http.post("http://localhost:8080/login?user=test&encryptedPass=test", null, requestOptions);
  }

}
