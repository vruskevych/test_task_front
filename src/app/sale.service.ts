import {Injectable} from '@angular/core';
import {SaleCurrency} from "./sale/sale.currency";
import {CURRENCIES} from "./sale/mock.sale.currencies";
import {Observable, of,throwError,pipe,catchError} from 'rxjs';
import {HttpClient,HttpErrorResponse} from "@angular/common/http";
import {GenerateSaleResponse} from "./sale/generate-sale-response";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private backendUrl = 'http://localhost:8000/sales';

  saleResponse: GenerateSaleResponse | null | undefined;

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<SaleCurrency[]> {
    return of(CURRENCIES);
  }

  submitForm(product:any, amount:any, currency:any) {
    let body = {product: product, cost: amount, currency: currency};
    return this.http.post<GenerateSaleResponse>(this.backendUrl, body);
  }

  getAllRecords()
  {
      return this.http.get<GenerateSaleResponse>(this.backendUrl);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
