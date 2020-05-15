import { Component } from '@angular/core';
import { SpendService } from '../spend/spend.service';
import { DatesService } from '../spend/dates.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  getTodaysDate() {
    return this.datesSrv.getTodaysDate();
  }

  onAdd() {
    if (this.amount) {
      if (!this.date) {
        let today = new Date();
        this.spendSrv.onAdd(this.amount, today, this.datesSrv.getMonth(today)); 
      } else {
        this.spendSrv.onAdd(this.amount, this.date, this.datesSrv.getMonth(this.date));
      }
      this.router.navigateByUrl('/tabs/tab2');
    } else {
      this.alertCtrl.create({
        header: 'No Value Entered',
        message: 'Please enter an amount',
        buttons: [{text: 'Okay', role: 'cancel'}]
      }).then(alertEl => alertEl.present());
    }
  }

}
