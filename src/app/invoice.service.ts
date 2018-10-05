import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Invoice } from './invoice';
import { InvoiceLine } from './invoice-line';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) {}

  private invoicesUrl = 'api/invoices';  // URL to web api
  private invoiceLinesUrl = 'api/invoicelines';  // URL to web api

  /** get all invoices */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl)
      .pipe(
        tap(invoices => this.log('fetched invoices')),
        catchError(this.handleError('getInvoices', []))
    );
  }

  /** GET invoice by id. Will 404 if id not found */
  getInvoice(id: number): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.get<Invoice>(url).pipe(
      tap(_ => this.log(`fetched invoice id=${id}`)),
      catchError(this.handleError<Invoice>(`getInvoice id=${id}`))
    );
  }

  /** POST: add a new invoice to the server */
  addInvoice (invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.invoicesUrl, invoice, httpOptions).pipe(
      tap((invoic: Invoice) => this.log(`added invoice w/ id=${invoic.id}`)),
      catchError(this.handleError<Invoice>('addInvoice'))
    );
  }

  /** PUT: update the invoice on the server */
  updateInvoice (invoice: Invoice): Observable<any> {
    return this.http.put(this.invoicesUrl, invoice, httpOptions).pipe(
      tap(_ => this.log(`updated invoice id=${invoice.id}`)),
      catchError(this.handleError<any>('updateInvoice'))
    );
  }

  /** DELETE: delete the invoice from the server */
  deleteInvoice (invoice: Invoice | number): Observable<Invoice> {
    const id = typeof invoice === 'number' ? invoice : invoice.id;
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.delete<Invoice>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted invoice id=${id}`)),
      catchError(this.handleError<Invoice>('deleteInvoice'))
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
  }
}
