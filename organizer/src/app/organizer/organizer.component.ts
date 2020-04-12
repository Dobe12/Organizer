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
    this.tasks.push(task);

    this.taskService.create(task).subscribe(res => {
      console.log(res);
      this.form.reset();
    }, err => {
      this.tasks.pop();
      console.log(err);
    });
  }

  removeTask(task: Task) {
    const preventTasks = this.tasks;
    this.tasks = this.tasks.filter(t => t.id !== task.id);

    this.taskService.remove(task).subscribe(() => {}, err => {
      console.log(err);
      this.tasks = preventTasks;
    });
  }
}
