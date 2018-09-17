import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const vendors = [
      { id: 101, code: 'AAA', name: 'Atomic Apple Aces'},
      { id: 102, code: 'BB', name: 'Better Bling'},
      { id: 103, code: 'PP', name: 'Peaceful Photos'}
    ];

    const invoices = [
      { id: 1001, customer: 'Joe' },
      { id: 1002, customer: 'Mary Jane'},
      { id: 1003, customer: 'Sally'},
      { id: 1004, customer: 'John'}
        ];

    const invoicelines = [
      { id: 201, invoiceId: 1001, line: 1, vendorId: 102, description: ' silver bracelet', unitCost: 10.50, quantity: 2},
      { id: 202, invoiceId: 1001, line: 2, vendorId: 101, description: 'Golden Delicious', unitCost: 5.55, quantity: 1},
      { id: 203, invoiceId: 1002, line: 1, vendorId: 103, description: 'landscape', unitCost: 20, quantity: 2},
      { id: 204, invoiceId: 1003, line: 1, vendorId: 103, description: 'seascape', unitCost: 25.00, quantity: 1},
      { id: 205, invoiceId: 1003, line: 2, vendorId: 102, description: 'necklass', unitCost: 75.99, quantity: 1},
      { id: 206, invoiceId: 1003, line: 3, vendorId: 102, description: 'ring', unitCost: 1.50, quantity: 3}
    ];

    return{ vendors, invoices, invoicelines };
  }
}
