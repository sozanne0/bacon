export class InvoiceLine {
  id: number;
  invoiceId: number;
  line: number;
  vendorId: number;
  description: string;
  unitCost: number;
  totalCost: number;
  dateCreated; Date;
}
