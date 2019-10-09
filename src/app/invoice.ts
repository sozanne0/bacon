import { InvoiceLine } from './invoice-line';

export class Invoice {
  id: number;
  customer: string;
  address: string;
  contact: string;
  amountPaid: number; // amount paid in cents
  private _amountPaidDollars: number;
  status: string; // open | balanced | error
  correctionAmt: number; // correction amount in cents
  private _correctionAmtDollars: number;
  correctionDescription: string;
  userId: number;
  timeCreated: Date;
  paymentMethod: String;
//  timeUpdated: Date;
  invoiceLines: InvoiceLine[];

  constructor(json: any) {
    this.id = json.id;
    this.customer = json.customer;
    this.address = json.address;
    this.contact = json.contact;
    this.amountPaid = json.amountPaid;
    this.status = json.status;
    this.correctionAmt = json.correctionAmt;
    this.correctionDescription = json.correctionDescription;
    this.userId = json.userId;
    this.timeCreated = json.timeCreated;
    this.paymentMethod = json.paymentMethod;
    this.initDollars();
  }

  private initDollars() {
    if (this.amountPaid !== undefined) {
      this._amountPaidDollars = this.amountPaid / 100;
    }
    if (this.correctionAmt !== undefined) {
      this._correctionAmtDollars = this.correctionAmt / 100;
    }
  }

  isBalanced(): boolean {
    return this.status === 'Balanced';
  }

  get amountPaidDollars(): number {
    return this._amountPaidDollars;
  }

  set amountPaidDollars(pdUSD: number) {
    this._amountPaidDollars = pdUSD;
    this.amountPaid = pdUSD * 100;
  }

  get correctionAmtDollars(): number {
    return this._correctionAmtDollars;
  }

  set correctionAmtDollars(cmUSD: number) {
    this._correctionAmtDollars = cmUSD;
    this.correctionAmt = cmUSD * 100;
    this.log(`Update Correction - CAmtD: ${this.correctionAmtDollars}, CAmt: ${this.correctionAmt}`);
  }

  log(message: string) {
    console.log(message);
  }
}
