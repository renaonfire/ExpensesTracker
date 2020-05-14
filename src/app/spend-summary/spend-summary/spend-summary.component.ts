import { Component, OnInit, Input } from '@angular/core';
import { SpendModel } from 'src/app/spend/spend.model';
import { SpendService } from 'src/app/spend/spend.service';
import { Subscription } from 'rxjs';
import { IonItemSliding } from '@ionic/angular';
import { DatesService } from 'src/app/spend/dates.service';

@Component({
  selector: 'app-spend-summary',
  templateUrl: './spend-summary.component.html',
  styleUrls: ['./spend-summary.component.scss'],
})
export class SpendSummaryComponent implements OnInit {

  @Input() month: string;

  selectedDate: Date;
  isLoading = true;

  loadedSpend: SpendModel[];
  loadedSpendSub: Subscription;

  constructor(
    private spendSrv: SpendService,
    private dateSrv: DatesService
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

  onDateChanged(month: Date) {
    let newMonth = this.dateSrv.getMonth(month);
    this.spendSrv.getSpendItems(newMonth);
  }


}
