import { Component } from '@angular/core';
import { SpendService } from '../spend/spend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  budget; 

  constructor(
    private spendSrv: SpendService,
    private router: Router
  ) {}

  onSaveBudget() {
    this.spendSrv.onAddBudget(this.budget);
    this.router.navigateByUrl('tabs/tab2');
  }

}
