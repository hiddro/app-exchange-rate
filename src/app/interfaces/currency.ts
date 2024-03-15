export interface ICurrency {
  id: number,
  currency: string,
}

export interface IExchangeRateRequest {
  amount: string,
  currencyOrigin: string,
  currencyDestin: string,
}

export interface IExchangeRateResponse {
  amount: number,
  amountExchange: number,
  currencyOrigin: string,
  currencyDestin: string,
  exchangeRate: number,
}
