import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpendModel } from './spend.model';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class SpendService {

  private _spendData = new BehaviorSubject<SpendModel[]>([]);

  get spendData() {
    return this._spendData.asObservable();
  } 

  spendRef = firebase.database().ref('spend');

  constructor(
  ) { }

  onAdd(amount: number, date: Date, month: string) {
    let generatedId = this.spendRef.push().key
    const newSpend = new SpendModel(
      generatedId,
      amount, 
      date,
      month
    );
    this.spendRef.child(month).child(generatedId).set(newSpend);
    return this._spendData.next([newSpend]);

  }
}
