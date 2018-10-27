import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Invoice } from './invoice';
import { InvoiceLine } from './invoice-line';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor';
import { forEach } from '@angular/router/src/utils/collection';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient,
    private vendorService: VendorService
  ) {}

  private invoicesUrl = 'api/receipts';  // URL to web api
  private invoiceLinesUrl = 'api/items';  // URL to web api

    /** get all invoiceLines for Invoice */
    getInvoiceInvoiceLines(invoice: Invoice | number): Observable<InvoiceLine[]> {
      const id = typeof invoice === 'number' ? invoice : invoice.id;
      const url = `${this.invoicesUrl}/${id}/items`;
      /**const url = this.invoiceLinesUrl; */
      this.log(`filtered Invoice line list URL: ${url}`);
      return this.http.get<InvoiceLine[]>(url, httpOptions)
        .pipe(map(jsonLines => this.convertLines(jsonLines)))
        .pipe(
          tap(lines => this.addVendors(lines)),
          tap(lines => this.log(`returned with ${lines.length} items`)),
          catchError(this.handleError('getInvoiceLines', []))
      );
    }
/**
    getInvoiceInvoiceLines2(invoice: Invoice | number): Observable<InvoiceLine[]> {
      const id = typeof invoice === 'number' ? invoice : invoice.id;
      const url = `${this.invoiceLinesUrl}/?receiptId=${id}`;
      this.log(`getting items for: ${JSON.stringify(invoice)}`);
      this.log(`using URL: ${url}`);
      // const url = this.invoiceLinesUrl;
      return this.http.get<InvoiceLine[]>(url, httpOptions)
        .pipe(map(jsonLines => this.convertLines(jsonLines)))
        .pipe(
          tap(lines => this.addVendors(lines)),
          tap(lines => this.log('fetched items')),
          catchError(this.handleError('getInvoiceLines', []))
      );
    }
*/
    convertLines(lines: InvoiceLine[]): InvoiceLine[] {
      const tempLines: InvoiceLine[] = [];
      lines.forEach(function(item) {
        tempLines.push(new InvoiceLine(item));
      });
      return tempLines;
    }

    /** GET invoiceLine by id. Will 404 if id not found */
    getInvoiceLine(id: number): Observable<InvoiceLine> {
      const url = `${this.invoiceLinesUrl}/${id}`;
      return this.http.get<InvoiceLine>(url)
      .pipe(map(jsonLine => new InvoiceLine(jsonLine)))
      .pipe(
        tap(aLine => this.addVendor(aLine)),
        tap(_ => this.log(`fetched item id=${id}`)),
        catchError(this.handleError<InvoiceLine>(`getInvoiceLine id=${id}`))
      );
    }

    private addVendors(lines: InvoiceLine[]): InvoiceLine[] {
      lines.forEach (line => { this.addVendor(line); });
      return lines;
    }

    private addVendor(iLine: InvoiceLine): InvoiceLine {
      const vid = typeof iLine === 'object' ? iLine.vendorId : undefined;
      this.log(`Adding Vendor:${vid} for line:${iLine.id}`);
      if (vid !== undefined) {
        this.vendorService.getVendor(vid)
        .subscribe(aVendor => iLine.vendor = aVendor);
      }

      return iLine;
    }

    /** POST: add a new invoiceLine to the server */
    addInvoiceLine (invoiceLine: InvoiceLine): Observable<InvoiceLine> {
      return this.http.post<InvoiceLine>(this.invoiceLinesUrl, invoiceLine, httpOptions)
      .pipe(map(jsonLine => new InvoiceLine(jsonLine)))
      .pipe(
        tap((anInvoiceLine: InvoiceLine) => this.log(`added item: ${JSON.stringify(anInvoiceLine)}`)),
        catchError(this.handleError<InvoiceLine>('addInvoiceLine'))
      );
    }

    /** PUT: update the invoiceLine on the server */
    updateInvoiceLine (invoiceLine: InvoiceLine): Observable<InvoiceLine> {
    //  const msg = `iLine unitCost: ${invoiceLine.unitCost}, ucd:${invoiceLine.unitCostDollars}`;
    //  this.log(msg);
    //  this.log(JSON.stringify(invoiceLine));
      const url = `${this.invoiceLinesUrl}/${invoiceLine.id}`;
    //  this.log(`URL: ${url}`);
      return this.http.patch<InvoiceLine>(url, invoiceLine, httpOptions).pipe(
      //  tap((anInvoiceLine: InvoiceLine) => this.addVendor(anInvoiceLine)),
        tap(_ => this.log(`updated invoiceLine id=${invoiceLine.id}`)),
        catchError(this.handleError<any>('updateInvoiceLine'))
      );
    }

    /** DELETE: delete the invoiceLine from the server */
    deleteInvoiceLine (invoiceLine: InvoiceLine | number): Observable<InvoiceLine> {
      const id = typeof invoiceLine === 'number' ? invoiceLine : invoiceLine.id;
      const url = `${this.invoiceLinesUrl}/${id}`;
      return this.http.delete<InvoiceLine>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted invoiceLine id=${id}`)),
        catchError(this.handleError<InvoiceLine>('deleteInvoiceLine'))
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
