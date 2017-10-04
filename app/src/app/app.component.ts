import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from '../../../core'


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { GatewayService } from './shared/gateway.service'
import { TodoInteractor } from '../../../lib'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _interactor: TodoInteractor;
  public todos: Todo[];
  public newTask: string;
  yourAnswer: string;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  color: string;
  position = 'above';

  availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  states: any[] = [
      {
          name: 'Arkansas',
          population: '2.978M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
      },
      {
          name: 'California',
          population: '39.14M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
      },
      {
          name: 'Florida',
          population: '20.27M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
      },
      {
          name: 'Texas',
          population: '27.47M',
          // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
          flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
      }
  ];

  answers = [
      'Yes',
      'No'
  ];

  filterStates(name: string) {
      return this.states.filter(state =>
          state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  constructor(private _formBuilder: FormBuilder) {
    const gateway = new GatewayService();
    const controller = {
      setTodoCollection: collection => {
        this.todos = collection
      }
    };

    this._interactor = new TodoInteractor(gateway, controller);

      this.stateCtrl = new FormControl();
      this.filteredStates = this.stateCtrl.valueChanges
          .startWith(null)
          .map(state => state ? this.filterStates(state) : this.states.slice());
  }

  ngOnInit() {
    this._interactor.onPageLoad();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public toggle(todo: Todo, ev) {
    ev.preventDefault();

    this._interactor.toggleTodo(todo.id)
  }

  public delete(todo: Todo) {
    this._interactor.deleteTodo(todo.id)
  }

  public addTodo(task: string) {
    this._interactor.addTodo(task);
    this.newTask = ""
  }
}
