import { Todo } from '../../core'

export interface ITodoGateway {
  getTodos(): Promise<Todo[]>
  removeTodo(id: number): Promise<void>
  addTodo(todo: Todo): Promise<number>
  toggleTodo(id: number): Promise<void>
}
