import { Component, OnInit, Input } from '@angular/core';
import { SpendModel } from 'src/app/spend/spend.model';
import { SpendService } from 'src/app/spend/spend.service';
import { Subscription } from 'rxjs';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-spend-summary',
  templateUrl: './spend-summary.component.html',
  styleUrls: ['./spend-summary.component.scss'],
})
export class SpendSummaryComponent implements OnInit {

  @Input() month: string;

  isLoading = true;

  loadedSpend: SpendModel[];
  loadedSpendSub: Subscription;

  constructor(
    private spendSrv: SpendService
  ) { }
  
  ngOnInit() {
    this.loadedSpendSub = this.spendSrv.spendChanged.subscribe(spend => {
      this.loadedSpend = spend;
      this.isLoading = false; 
    })
    this.spendSrv.getSpendItems(this.month);
  }

  ionViewWillEnter() {
  
  }

  onDeleteSpend(id: string, slidingEl: IonItemSliding) {

  }


}
