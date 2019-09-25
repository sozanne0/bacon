/** holds summary informatino for the summary report (and for vendor report) */
export class SummaryInfo {
  vendorId: number;
  grossSumDollars: number;
  consignmentShareDollars: number;
  netSumDollars: number;

  constructor(json: any) {
    this.vendorId = json.vendorId;
    this.grossSumDollars = json.grossSumDollars;
    this.consignmentShareDollars = json.consignmentShareDollars;
    this.netSumDollars = json.netSumDollars;
  }
}

