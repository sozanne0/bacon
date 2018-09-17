import { InvoiceLine } from './invoice-line';

export class Invoice {
  id: number;
  customer: string;
  address: string;
  contact: string;
  timeCreated: Date;
//  timeUpdated: Date;
  invoiceLines: InvoiceLine[];
}
