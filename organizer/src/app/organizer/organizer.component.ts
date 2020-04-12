import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TaskService} from '../shared/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];

  constructor(private dateService: DateService,
              private taskService: TaskService) { }

  ngOnInit() {

    this.dateService.date.pipe(
      switchMap(value => this.taskService.getTasks(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit() {
    const {title} = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.taskService.create(task).subscribe(res => {
      this.tasks.push(res);
      this.form.reset();
    }, err => console.error(err));
  }

  removeTask(task: Task) {
  this.taskService.remove(task).subscribe(() => {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }, err => console.log(err));
  }
}
