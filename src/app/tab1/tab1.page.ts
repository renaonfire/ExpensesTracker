import { Component, Input, ViewChild } from '@angular/core';
import { SpendService } from '../spend/spend.service';
import { DatesService } from '../spend/dates.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  date: Date;
  amount: number;

  constructor(
    private spendSrv: SpendService,
    private datesSrv: DatesService
  ) {}

  onAdd() {
    this.spendSrv.onAdd(this.amount, this.date, this.datesSrv.getMonth(this.date));
  }

}
