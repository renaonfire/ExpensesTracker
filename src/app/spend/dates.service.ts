import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class DatesService {
    constructor() {}

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    getMonth(date: Date) {
        let newDate = new Date(date);
        let month = newDate.getMonth();
        return this.months[month];
    }

    getTodaysDate() {
        let date = new Date()
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        return `${day} ${this.months[month]} ${year}`;
    }
  }