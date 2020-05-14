import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpendService } from '../spend/spend.service';
import { DatesService } from '../spend/dates.service';
import { ModalController } from '@ionic/angular';
import { SpendSummaryComponent } from '../spend-summary/spend-summary/spend-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  isLoading = true;
  date = new Date();
  spend = 0;
  budget = 0;
  remainder = 0;

  spendSub: Subscription;
  budgetSub: Subscription;

  constructor(
    private spendSrv: SpendService,
    private datesSrv: DatesService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.spendSub = this.spendSrv.sumChanged.subscribe(sum => {
      this.isLoading = false;
      this.spend = sum;
    })
    this.budgetSub = this.spendSrv.budgetChanged.subscribe(b => {
      this.isLoading = false;
      this.budget = b;
      this.remainder = this.spend - this.budget;
    })
    this.spendSrv.getSumOfSpend(this.datesSrv.getMonth(this.date));
    this.spendSrv.getBudget();
  }

  onSpendClicked() {
    this.modalCtrl.create({
       component: SpendSummaryComponent,
       componentProps: {month: this.datesSrv.getMonth(this.date)}
    }).then(modalEl => 
      modalEl.present()
    );
  }

  onBudgetClicked() {
    this.router.navigateByUrl('tabs/tab3');
  }

}
