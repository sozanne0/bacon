import { Component } from '@angular/core';
@Component({
    selector: 'app-date-time',
    template: `{{ now | date:'MM/dd/yyyy HH:mm:ss'}}`
})
export class DateTimeComponent {
    now: number;

    constructor() {
      this.now = Date.now();
      /*
        setInterval(() => {
          this.now = Date.now();
        }, 1);
      */
    }
}
