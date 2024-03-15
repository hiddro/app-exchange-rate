import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { ICurrency, IExchangeRateRequest, IExchangeRateResponse } from './interfaces/currency';
import { UserService } from './services/user.service';
import { IToken } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: ICurrency[] = [];
  exchange?: IExchangeRateRequest;
  exchangeRes?: IExchangeRateResponse;
  dataUser?: IToken;

  form = this._formBuilder.group({
    input: [''],
    select: [''],
    responseInput: ['']
  });

  constructor(private currencyService: CurrencyService,
    private userService: UserService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generateToken();
  }

  generateToken() {
    this.userService.httpToken()
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe((token: any) => {
        this.dataUser = token;
        this.loadCurrency();
      });
  }

  loadCurrency() {
    this.currencyService.getCurrency(this.dataUser!)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe((data: any) => {
        this.options = data;
      });
  }

  postCalculate() {
    this.exchange = {
      amount: this.form.value.input ?? '',
      currencyOrigin: "PEN",
      currencyDestin: this.form.value.select ?? '',
    };

    this.currencyService.httpCalculate(this.exchange, this.dataUser!)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => new Error(error));
        })
      )
      .subscribe((data: any) => {
        this.exchangeRes = data;
        this.form.get('responseInput')?.setValue('' + this.exchangeRes?.amountExchange);
      });
  }

  onClick() {
    console.log("hola")
  }
}
