# Lib

The library is the part that contains the application logic layer. 

The [TodoInteractor](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/todo.interactor.ts) encapsulate and implement all the use cases of the application.

It uses the [dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) by defining two interfaces, [ITodoGateway](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/i-todo-gateway.interface.ts) to handle the data and [ITodoController](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/i-todo-controller.interface.ts) to handle the view.
This allow the interactor to ignore the mechanisms as well as definining the policies. The mechanisms will be implemented by the objects [injected](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/todo.interactor.ts#L8) in the interactor.

This also helps us to [test](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/todo.interactor.spec.ts) our application's logic: we [control](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/todo.interactor.spec.ts#L36) the mechanism and their results, and we can focus on the application logic.
