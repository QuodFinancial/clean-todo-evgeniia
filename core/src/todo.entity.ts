export class Todo {
  public id: number
  public creationDate: Date
  public task: string
  public done: boolean

  constructor(todo: {
    id?: number,
    task: string,
    creationDate?: Date,
    done?: boolean,
  }) {
    this.id = todo.id
    this.task = todo.task
    this.done = todo.done !== false
    this.creationDate = todo.creationDate ? todo.creationDate : new Date()
  }
}
