import { Injectable } from '@angular/core';

import { Todo } from '../../../../core'

@Injectable()
export class GatewayService {
  private _todos: Todo[]

  constructor() {
    this._checkLocalStorageData()
  }

  private _checkLocalStorageData() {
    let todos = localStorage.getItem('todos')

    if (todos == null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      try {
        if (!Array.isArray(JSON.parse(todos))) {
          localStorage.setItem('todos', JSON.stringify([]))
        }
      } catch (e) {
        console.error('Todos from local storage parsing error', e)
        localStorage.setItem('todos', JSON.stringify([]))
      }
    }

    this._todos = JSON.parse(localStorage.getItem('todos'))
      .map(todo => new Todo(todo))
  }

  public getTodos(): Promise<Todo[]> {
    return Promise.resolve(this._todos.map(t => new Todo(t)))
  }

  public removeTodo(id: number): Promise<void> {
    let index = this._todos
      .findIndex(t => t.id === id)

    if (index < 0) {
      return Promise.reject(`Todo with id ${id} does not exist`)
    }

    this._todos.splice(index, 1)

    this._setLocalStorageData()

    return Promise.resolve()
  }

  public addTodo(todo: Todo): Promise<number> {
    let lastID = this._todos
      .reduce((id, todo) => Math.max(id, todo.id), -1)

    this._todos.push(
      new Todo({
        id: ++lastID,
        creationDate: todo.creationDate,
        done: todo.done,
        task: todo.task
      })
    )

    this._setLocalStorageData()

    return Promise.resolve(lastID)
  }

  public toggleTodo(id: number): Promise<void> {
    let index = this._todos
      .findIndex(t => t.id === id)

    if (index < 0) {
      return Promise.reject(`Todo with id ${id} does not exist`)
    }

    this._todos[index].done = !(this._todos[index].done)

    this._setLocalStorageData()

    return Promise.resolve()
  }

  private _setLocalStorageData() {
    localStorage.setItem('todos', JSON.stringify(this._todos))
  }
}
