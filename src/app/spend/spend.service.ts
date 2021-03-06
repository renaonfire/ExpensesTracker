import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SpendModel, BudgetModel } from './spend.model';
import * as firebase from 'firebase'
import { IonItemSliding } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpendService {

  private _spendData = new BehaviorSubject<SpendModel[]>([]);

  private _budgetData = new BehaviorSubject<BudgetModel[]>([]);

  get spendData() {
    return this._spendData.asObservable();
  } 

  get budgetData() {
    return this._budgetData.asObservable();
  }

  sumOfSpend: number;
  sumChanged = new Subject<number>();
  budgetChanged = new Subject<number>();
  spendChanged = new Subject<SpendModel[]>();

  spendRef = firebase.database().ref('spend');
  budgetRef = firebase.database().ref('budget');

  onAdd(amount: number, date: Date, month: string) {
    let generatedId = this.spendRef.push().key
    console.log(date);
    const newSpend = new SpendModel(
      generatedId,
      amount, 
      date,
      month
    );
    console.log(newSpend);
    
    this.spendRef.child(month).child(generatedId).set(newSpend);
    return this._spendData.next([newSpend]);

  }

  onAddBudget(amount: number) {
    const newBudget = new BudgetModel(
      amount
    );
    this.budgetRef.set(newBudget);
    return this._budgetData.next([newBudget]);
  }

  getSumOfSpend(month: string) {
    this.spendRef.child(month).once('value').then(resData => {
      let spendValues = [];
      for (const key in resData.val()) {
        if(resData.val().hasOwnProperty(key)) {
          spendValues.push(+resData.val()[key].amount);
        }
      }
      this.sumOfSpend = spendValues.reduce((a, b) => a + b) as number;
      this.sumChanged.next(this.sumOfSpend);
      return this.sumOfSpend;
    }
    )
  }

  getBudget() {
    this.budgetRef.once('value').then(resData => {
      let budget: number;
        if(resData.val()) {
          budget = +resData.val().budget;
        } else {
          budget = 0;
        }
      this.budgetChanged.next(budget);
      return budget;
    }
    )
  }

  getSpendItems(month: string) {
    this.spendRef.child(month).once('value').then(resData => {
      let spendItems = [];
      for (const key in resData.val()) {
        if(resData.val().hasOwnProperty(key)) {
          spendItems.push(new SpendModel(
            resData.val()[key].id,
            resData.val()[key].amount,
            resData.val()[key].date,
            month
          ));
        }
      }
      this.spendChanged.next(spendItems);
      return spendItems;
    })
  }

  onDeleteSpendItem(id: string, month: string, slidingEl: IonItemSliding) {
    this.spendRef.child(month).child(id).remove();
    this.getSpendItems(month);
  }
}
