import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { Client } from "../model/client";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  basePath = 'http://localhost:3000/clients'

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  getAll(): Observable<Client> {
    return this.http.get<Client>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getById(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(item: any): Observable<Client> {
    return this.http.post<Client>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(id: any, item: any): Observable<Client> {
    return this.http.post<Client>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  delete(id: any) {
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
