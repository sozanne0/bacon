import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Invoice } from './invoice';
import { environment } from '../environments/environment';

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

  private invoicesUrl = `${environment.baseUrl}/receipts`;  // URL to web api
  // private invoiceLinesUrl = 'api/items';  // URL to web api

  /** get all invoices */
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl)
    .pipe(map(jsonIinvoices => this.convertInvoices(jsonIinvoices)))
    .pipe(
        tap(invoices => this.log(`fetched ${invoices.length} receipts`)),
        catchError(this.handleError('getReceipts', []))
    );
  }

  /** get all invoices for user */
  getUserInvoices(userId: number): Observable<Invoice[]> {
    const url = `${this.invoicesUrl}q?userId=${userId}`;
    this.log(`getting user invoices, url: ${url}`);
    return this.http.get<Invoice[]>(url)
    .pipe(map(jsonIinvoices => this.convertInvoices(jsonIinvoices)))
    .pipe(
        tap(invoices => this.log(`fetched ${invoices.length} user receipts`)),
        catchError(this.handleError('getReceipts', []))
    );
  }

  /** GET invoice by id. Will 404 if id not found */
  getInvoice(id: number): Observable<Invoice> {
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.get<Invoice>(url)
    .pipe(map(jsonInvoice => new Invoice(jsonInvoice)))
    .pipe(
      tap(_ => this.log(`fetched receipt id=${id}`)),
      catchError(this.handleError<Invoice>(`getReceipt id=${id}`))
    );
  }

  /** Find invoice by attrubutes in invoice parameter */
  findInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.get<Invoice>(this.invoicesUrl)
      .pipe(map(jsonInvoice => new Invoice(jsonInvoice)))
      .pipe(
        tap(objInvoice => this.log(`fetched receipt id=${objInvoice.id}`)),
        catchError(this.handleError<Invoice>(`find Receipt ${JSON.stringify(invoice)}`))
      );
    }

  /** POST: add a new invoice to the server */
  addInvoice (invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.invoicesUrl, invoice, httpOptions)
    .pipe(map(jsonInvoice => new Invoice(jsonInvoice)))
    .pipe(
      tap((invoic: Invoice) => this.log(`added receipt w/ id=${invoic.id}`)),
      catchError(this.handleError<Invoice>('addReceipt'))
    );
  }

  /** PUT: update the invoice on the server */
  updateInvoice (invoice: Invoice): Observable<any> {
    const url = `${this.invoicesUrl}/${invoice.id}`;
    return this.http.patch(url, invoice, httpOptions).pipe(
      tap(_ => this.log(`updated receipt id=${invoice.id}`)),
    //  tap(inv => this.log(JSON.stringify(inv))),
      catchError(this.handleError<any>(`updateReceipt ${invoice.id}`))
    );
  }

  /** DELETE: delete the invoice from the server */
  deleteInvoice (invoice: Invoice | number): Observable<Invoice> {
    const id = typeof invoice === 'number' ? invoice : invoice.id;
    const url = `${this.invoicesUrl}/${id}`;
    return this.http.delete<Invoice>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted receipt id=${id}`)),
      catchError(this.handleError<Invoice>('deleteReceipt'))
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

  convertInvoices(invoices: Invoice[]): Invoice[] {
    const tempInvoices: Invoice[] = [];
    invoices.forEach(function(inv) {
      tempInvoices.push(new Invoice(inv));
    });
    return tempInvoices;
  }

/**
   * logging (TBD)
   */
  private log(message: string) {
    console.log(message);
  }
}
