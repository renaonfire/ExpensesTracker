import { Component } from '@angular/core';
import { SpendService } from '../spend/spend.service';
import { DatesService } from '../spend/dates.service';
import { Router } from '@angular/router';

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
    private datesSrv: DatesService,
    private router: Router
  ) {}

  onAdd() {
    this.spendSrv.onAdd(this.amount, this.date, this.datesSrv.getMonth(this.date));
    this.router.navigateByUrl('/tabs/tab2');
  }

}
