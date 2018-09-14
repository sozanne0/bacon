export class InvoiceLine {
  id: number;
  invoiceId: number;
  line: number;
  vendorId: number;
  description: string;
  unitCost: number;
  quantity: number;
  totalCost: number;
  dateCreated; Date;
}
