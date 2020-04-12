import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(private dateService: DateService) { }

  changeMonth(value: number) {
    this.dateService.changeMonth(value);
 }
}
