import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/date.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  generate(currentMonth: moment.Moment) {
    const firstDay = currentMonth.clone().startOf('month').startOf('week');
    const lastDay = currentMonth.clone().endOf('month').endOf('week');

    const iteratedDate = firstDay.clone().subtract(1, 'day');

    const calendar = [];

    while (iteratedDate.isBefore(lastDay, 'day')) {
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const value = iteratedDate.add(1, 'day').clone();
          const active = moment().isSame(value, 'date');
          const disabled = !currentMonth.isSame(value, 'month');
          const selected = currentMonth.isSame(value, 'date');

          return { value, active, disabled, selected };
        })
      });
    }
    this.calendar = calendar;
  }

  selectDay(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

}
