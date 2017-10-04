import { Todo } from '../../core'

import { ITodoController, ITodoGateway } from '.'

export class TodoInteractor {
  private _todos: Todo[] = []

  constructor(private _gateway: ITodoGateway, private _controller: ITodoController) { }

  get todos(): Todo[] {
    return this._todos
  }

  public onPageLoad(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._gateway.getTodos()
        .then(res => {
          this._todos = res

          this._controller.setTodoCollection(this._todos)
          resolve()
        })
        .catch(err => {
          console.error(err)
          reject()
        })
    })
  }

  public deleteTodo(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const index = this._todos
        .findIndex(_todo => _todo.id === id)

      if (index < 0) {
        console.error(`Todo ${id} not found`)
        reject()
        return
      }

      this._gateway.removeTodo(id)
        .then(() => {
          this._todos.splice(index, 1)

          this._controller.setTodoCollection(this._todos)
          resolve()
        })
        .catch(err => {
          console.error(err)
          reject()
        })
    })
  }

  public addTodo(task: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!task) {
        reject()
        return
      }

      let todo = new Todo({
        creationDate: new Date(),
        done: false,
        task
      })

      this._gateway.addTodo(todo)
        .then(id => {
          todo.id = id
          this._todos.push(todo)

          this._controller.setTodoCollection(this._todos)
          resolve()
        })
        .catch(err => {
          console.error(err)
          reject()
        })
    })
  }

  public toggleTodo(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const todoFromCollection = this._todos
        .find(_todo => _todo.id === id)

      if (todoFromCollection) {
        this._gateway.toggleTodo(id)
          .then(() => {
            todoFromCollection.done = !(todoFromCollection.done)

            this._controller.setTodoCollection(this._todos)

            resolve()
          })
          .catch(err => {
            console.error(err)
            reject()
          })
      } else {
        reject()
      }
    })
  }
}
