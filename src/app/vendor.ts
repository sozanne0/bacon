import { InvoiceLine } from './invoice-line';

export class Vendor {
  id: number;
  code: string;
  name: string;
  address1; string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  category: number;
  location: string;
  description: string;
  itemSumDollars: number; // calculated value
  invoiceLines: InvoiceLine[];

  constructor(json: any) {
    this.id = json.id;
    this.code = json.code;
    this.name = json.name;
    this.address1 = json.address1;
    this.address2 = json.address2;
    this.city = json.city;
    this.state = json.state;
    this.zip = json.zip;
    this.category = json.category;
    this.location = json.location;
    this.description = json.description;
  }
}
