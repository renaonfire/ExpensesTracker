import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpendService } from '../spend/spend.service';
import { DatesService } from '../spend/dates.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isLoading = true;
  date = new Date();
  spend: number;
  budget: number;
  remainder: number;

  spendSub: Subscription;

  constructor(
    private spendSrv: SpendService,
    private datesSrv: DatesService
  ) {}

  ngOnInit() {
    this.spendSub = this.spendSrv.sumChanged.subscribe(sum => {
      this.isLoading = false;
      this.spend = sum;
    })
    this.spendSrv.getSumOfSpend(this.datesSrv.getMonth(this.date));
  }

  onSpendClicked() {

  }

  onBudgetClicked() {

  }

}
