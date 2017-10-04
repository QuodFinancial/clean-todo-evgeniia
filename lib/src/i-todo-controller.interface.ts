import { Todo } from '../../core'

export interface ITodoController {
  setTodoCollection(collection: Todo[]): void
}
