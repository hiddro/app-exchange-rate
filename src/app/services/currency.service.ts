import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExchangeRateRequest } from '../interfaces/currency';
import { IToken } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency(token: IToken) {
    const headers = new HttpHeaders({
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}`
    });

    const requestOptions = { headers: headers };

    return this.http.get("http://localhost:8080/api/exchange/currency", requestOptions);
  }

  httpCalculate(request: IExchangeRateRequest, token: IToken) {

    const headers = new HttpHeaders({
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.token}`
    });

    const requestOptions = { headers: headers };

    return this.http.post("http://localhost:8080/api/exchange/calculate", request, requestOptions);
  }

}
