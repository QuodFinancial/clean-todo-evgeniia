import { Component, OnInit } from '@angular/core';

import { Todo } from '../../../core'

import { GatewayService } from './shared/gateway.service'
import { TodoInteractor } from '../../../lib'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _interactor: TodoInteractor

  public todos: Todo[]
  public newTask: string

  constructor() {
    const gateway = new GatewayService()
    const controller = {
      setTodoCollection: collection => {
        this.todos = collection
      }
    }

    this._interactor = new TodoInteractor(gateway, controller)
  }

  ngOnInit() {
    this._interactor.onPageLoad()
  }

  public toggle(todo: Todo, ev) {
    ev.preventDefault()

    this._interactor.toggleTodo(todo.id)
  }

  public delete(todo: Todo) {
    this._interactor.deleteTodo(todo.id)
  }

  public addTodo(task: string) {
    this._interactor.addTodo(task)
    this.newTask = ""
  }
}
