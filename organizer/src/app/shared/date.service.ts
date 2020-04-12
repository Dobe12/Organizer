import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());

  changeMonth(value: number) {
    const newDate = this.date.value.add(value, 'month');
    this.date.next(newDate);
  }

  changeDate(date: moment.Moment) {
    const newDate = this.date.value.set({
      date: date.date(),
      month: date.month()
    });
    this.date.next(newDate);
  }
}
