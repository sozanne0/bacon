import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


import { Vendor } from './vendor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private http: HttpClient
  ) {}

//  private vendorsUrl = 'api/vendors';  // URL to web api
  private vendorsUrl = `${environment.baseUrl}/vendors`;  // URL to web api

  /** get all vendors */
  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorsUrl)
      .pipe(
        tap(vendors => this.log(`fetched ${vendors.length} vendors`)),
        catchError(this.handleError('getVendors', []))
    );
  }

  /** GET vendor by id. Will 404 if id not found */
  getVendor(id: number): Observable<Vendor> {
    const url = `${this.vendorsUrl}/${id}`;
    return this.http.get<Vendor>(url).pipe(
      tap(_ => this.log(`fetched vendor id=${id}`)),
      catchError(this.handleError<Vendor>(`getvendor id=${id}`))
    );
  }

  /** POST: add a new vendor to the server */
  addVendor (vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.vendorsUrl, vendor, httpOptions)
      .pipe(
        tap((aVendor: Vendor) => this.log(`added vendor w/ id=${aVendor.id}`)),
        catchError(this.handleError<Vendor>('addvendor'))
    );
  }

  /** PUT: update the vendor on the server */
  updateVendor (vendor: Vendor): Observable<any> {
    const url = `${this.vendorsUrl}/${vendor.id}`;
    return this.http.patch(url, vendor, httpOptions).pipe(
      tap(_ => this.log(`updated vendor id=${vendor.id}`)),
      catchError(this.handleError<any>(`updateVendor id=${vendor.id}`))
    );
  }

  /** DELETE: delete the vendor from the server */
  deleteVendor (vendor: Vendor | number): Observable<Vendor> {
    const id = typeof vendor === 'number' ? vendor : vendor.id;
    const url = `${this.vendorsUrl}/${id}`;

    return this.http.delete<Vendor>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted vendor id=${id}`)),
      catchError(this.handleError<Vendor>('deleteVendor'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }
}
