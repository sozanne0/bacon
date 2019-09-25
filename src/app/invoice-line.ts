import { Vendor } from './vendor';

export class InvoiceLine {
  id: number;
  receiptId: number;
  line: number;
  vendorId: number;
  vendor: Vendor;
  description: string;
  unitCost: number; // integer cents
  private _unitCostDollars: number;
  quantity: number;
  totalCost: number; // integer cents
  private _totalCostDollars: number;
  dateCreated; Date;

  constructor(json: any) {
    this.id = json.id;
    this.receiptId = json.receiptId;
    this.line = json.line;
    this.vendorId = json.vendorId;
    this.vendor = json.vendor;
    this.description = json.description;
    this.unitCost = json.unitCost;
    this.quantity = json.quantity;
    this.totalCost = json.totalCost;
    this.dateCreated = json.dateCreated;
    this.log('init invoiceLine');
    if (this.unitCost !== undefined && this.unitCostDollars === undefined) {
      // load unit cost dollars from unit cost (and total cost dollars too)
      this.initDollars();
      // this.log(JSON.stringify(this));
    }
  }

  private initDollars() {
    this._unitCostDollars = this.unitCost / 100;
    this._totalCostDollars = this.quantity * this.unitCostDollars;
  }

  public setVendor(aVendor: Vendor): void {
    this.vendor = aVendor;
    if (typeof aVendor === 'object') {
      this.vendorId = aVendor.id;
      console.log('vendor:', this.vendorId, ' set in item:', this.id);
    }
  }

  get unitCostDollars(): number {
    return this._unitCostDollars;
  }

  set unitCostDollars(aUCD: number) {
    this._unitCostDollars = aUCD;
    this.unitCost = aUCD * 100;
    this.log(`ucd: ${this._unitCostDollars}, uc: ${this.unitCost}`);
  }

  get totalCostDollars(): number {
    return this._totalCostDollars;
  }

  set totalCostDollars(aTCD: number) {
    this._totalCostDollars = aTCD;
    this.totalCost = aTCD * 100;
  }

  public prepareToSave() {
    this.totalCostDollars = this.quantity * this.unitCostDollars;
  }

  log(message: string) {
    console.log(message);
  }
}
