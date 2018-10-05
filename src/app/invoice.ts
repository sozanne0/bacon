import { InvoiceLine } from './invoice-line';

export class Invoice {
  id: number;
  customer: string;
  address: string;
  contact: string;
  amountPaid: number;
  status: string; // new | balanced | error
  correctionAmt: number;
  correctionDescription: string;
  timeCreated: Date;
//  timeUpdated: Date;
  invoiceLines: InvoiceLine[];
}
