import { Component, OnInit } from '@angular/core';
import { SpendService } from '../spend/spend.service';
import { Router } from '@angular/router';
import { BudgetModel } from '../spend/spend.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  budget: number;
  budgetSub: Subscription;

  constructor(
    private spendSrv: SpendService,
    private router: Router
  ) {}

  ngOnInit() {
    this.budgetSub = this.spendSrv.budgetChanged.subscribe(b => {
      this.budget = b;
      console.log(this.budget);
    })
    this.spendSrv.getBudget();
  }

  onSaveBudget() {
    this.spendSrv.onAddBudget(this.budget);
    this.router.navigateByUrl('tabs/tab2');
  }

}
