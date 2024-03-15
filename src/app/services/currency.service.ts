import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExchangeRateRequest } from '../interfaces/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency() {
    const headers = new HttpHeaders({
      "Accept": 'application/json',
      'Content-Type': 'application/json',
    });

    const requestOptions = { headers: headers };

    return this.http.get("http://localhost:8080/api/exchange/currency", requestOptions);
  }

  httpCalculate(request: IExchangeRateRequest) {

    let headers = new HttpHeaders();

    headers.set('content-type', 'application/json');
    headers.set('Accept', 'application/pdf');

    let requestOptions = { headers: headers };

    return this.http.post("http://localhost:8080/api/exchange/calculate", request, requestOptions);
  }

}
