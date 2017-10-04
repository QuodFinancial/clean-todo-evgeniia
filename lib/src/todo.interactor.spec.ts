import 'mocha'
import * as chai from 'chai'
import * as spies from 'chai-spies'

import { Todo } from '../../core'

import { TodoInteractor, ITodoController, ITodoGateway } from '.'

chai.use(spies)
const expect = chai.expect

let sut: TodoInteractor, controller: ITodoController, gateway: ITodoGateway, todo: Todo, todo_: Todo

const noop = () => undefined

describe('TodoInteractor', () => {
  beforeEach(() => {
    todo_ = new Todo({
      id: 2,
      creationDate: new Date(),
      done: true,
      task: 'Something that has been done'
    })

    todo = new Todo({
      id: 1,
      creationDate: new Date(),
      done: false,
      task: 'Something that need to be done'
    })

    controller = {
      setTodoCollection: noop,
    }

    gateway = {
      addTodo: todo => Promise.resolve(3),
      getTodos: () => Promise.resolve([
        todo,
        todo_
      ]),
      removeTodo: () => Promise.resolve(),
      toggleTodo: () => Promise.resolve(),
    }

    sut = new TodoInteractor(gateway, controller)
  })

  describe('onPageLoad', () => {
    it('Should get the todo collection', done => {
      gateway.getTodos = () => {
        done()
        return Promise.resolve([todo])
      }

      sut.onPageLoad()
    })

    it('Should set the todo collection in the interactor', done => {
      const todoCollection = [todo]

      gateway.getTodos = () => Promise.resolve(todoCollection)

      sut.onPageLoad()
        .then(() => {
          expect(sut.todos).to.equal(todoCollection)
          done()
        })
    })

    it('Should set the todo collection to the view', done => {
      const todoCollection = [todo]

      gateway.getTodos = () => Promise.resolve(todoCollection)

      controller.setTodoCollection = collection => {
        expect(collection).to.equal(todoCollection)
        done()
      }

      sut.onPageLoad()
    })
  })

  describe('deleteTodo', () => {
    beforeEach(() => {
      return sut.onPageLoad()
    })

    it('Should not ask the gateway to delete the todo if it is not in the collection', done => {
      let spy = chai.spy.on(gateway, 'removeTodo')

      sut.deleteTodo(10)
        .catch(() => {
          expect(spy).not.to.have.been.called
          done()
        })
    })

    it('Should ask the gateway to delete the todo if it is in the collection', done => {
      gateway.removeTodo = id => {
        expect(id).to.equal(todo.id)
        done()
        return Promise.resolve()
      }

      sut.deleteTodo(todo.id)
    })

    it('Should delete the todo from the interactor if the gateway resolved the Promise', done => {
      sut.deleteTodo(todo.id)
        .then(() => {
          expect(sut.todos).to.deep.equal([
            todo_
          ])

          done()
        })
    })

    it('Should set to the view the todo collection without the deleted todo if the gateway resolved the Promise', done => {
      controller.setTodoCollection = collection => {
        expect(collection).to.deep.equal([
          todo_
        ])

        done()
      }

      sut.deleteTodo(todo.id)
    })

    it('Should not delete the todo from the interactor nor set the collection if the gateway rejected the Promise', done => {
      const spy = chai.spy.on(controller, 'setTodoCollection')

      gateway.removeTodo = id => Promise.reject('Spec rejected the Promise intentionnaly')

      sut.deleteTodo(todo.id)
        .catch(() => {
          expect(sut.todos).to.deep.equal([
            todo,
            todo_
          ])

          expect(spy).not.to.have.been.called

          done()
        })
    })
  })

  describe('addTodo', () => {
    let task;

    beforeEach(() => {
      task = 'This has to be done'

      gateway.getTodos = () => Promise.resolve([todo_])

      return sut.onPageLoad()
    })
    
    it('Should not ask the gateway to add the todo nor set the todo in the interactor if the task is an empty string', done => {
      let spy = chai.spy.on(gateway, 'addTodo')

      sut.addTodo('')
        .catch(() => {
          expect(spy).not.to.have.been.called
          expect(sut.todos).to.have.lengthOf(1)

          done()
        })
    })

    it('Should ask the gateway to add the todo', done => {
      gateway.addTodo = _todo => {
        expect(_todo.task).to.equal(task)
        expect(_todo.creationDate).not.to.be.undefined
        expect(_todo.done).to.be.false

        done()

        return Promise.resolve(42)
      }

      sut.addTodo(task)
    })

    it('Should not add the todo in the interactor if the gateway rejected the Promise', done => {
      gateway.addTodo = () => Promise.reject('Spec rejected the Promise intentionnaly')

      sut.addTodo(task)
        .catch(() => {
          expect(sut.todos.map(t => t.task)).not.to.contain(task)
          done()
        })
    })

    it('Should add the todo in the interactor if the gateway resolved the Promise', done => {
      sut.addTodo(task)
        .then(() => {
          expect(sut.todos.map(t => t.task)).to.contain(task)
          done()
        })
    })

    it('Should set the id given by the gateway', done => {
      sut.addTodo(task)
        .then(() => {
          expect(sut.todos.find(t => t.task === task).id).to.equal(3)
          done()
        })
    })

    it('Should set the new Todo collection to the view', done => {
      controller.setTodoCollection = todos => {
        expect(todos).to.equal(sut.todos)

        done()
      }

      sut.addTodo(task)
    })
  })

  describe('toggleTodo', () => {
    beforeEach(() => {
      return sut.onPageLoad()
    })

    it('Should ask the gateway to toggle the todo if it is in the collection', done => {
      gateway.toggleTodo = id => {
        expect(id).to.equal(1)

        done()

        return Promise.resolve()
      }

      sut.toggleTodo(1)
    })

    it('Should not ask the gateway to toggle the todo if it is not in the collection', done => {
      const spy = chai.spy.on(gateway, 'toggleTodo')

      sut.toggleTodo(42)
        .catch(() => {
          expect(spy).not.to.have.been.called

          done()
        })
    })

    it('Should not modify the todo if the gateway rejected the Promise', done => {
      gateway.toggleTodo = id => Promise.reject('Spec rejected the Promise intentionnaly')

      sut.toggleTodo(1)
        .catch(() => {
          expect(sut.todos.find(t => t.id === 1).done).to.be.false
          done()
        })
    })

    it('Should modify the todo if the gateway resolved the Promise', done => {
      sut.toggleTodo(1)
        .then(() => {
          expect(sut.todos.find(t => t.id === 1).done).to.be.true
          done()
        })
    })

    it('Should set the updated Todos collection to the view', done => {
      controller.setTodoCollection = collection => {
        expect(collection).to.equal(sut.todos)

        done()
      }

      sut.toggleTodo(1)
    })
  })
})
