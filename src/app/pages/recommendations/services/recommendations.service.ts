import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Recommendation} from "../model/recommendation";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  basePath = 'http://localhost:3000/recommendations'

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  getAll(): Observable<Recommendation> {
    return this.http.get<Recommendation>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getRecommendation(id: number): Observable<Recommendation> {
    return this.http.get<Recommendation>(`${this.basePath}/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  create(item: any): Observable<Recommendation> {
    return this.http.post<Recommendation>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(item: any, id: number): Observable<Recommendation> {
    return this.http.put<Recommendation>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
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
