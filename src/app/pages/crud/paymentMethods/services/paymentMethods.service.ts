import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PaymentMethod} from "../model/paymentMethod";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {
  basePath = 'http://localhost:3000/paymentMethod'

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  getAll(): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getNutritionist(id: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(`${this.basePath}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(item: any): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(item: any, id: number): Observable<PaymentMethod> {
    return this.http.put<PaymentMethod>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message}`);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError('Something happened with request, please try again later');
  }
}
