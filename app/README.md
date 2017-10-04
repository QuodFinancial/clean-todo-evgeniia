# App

The app part contains the interface adapters layer as well as the frameworks and drivers.

The entire `app` folder is a project generated with [Angular CLI](https://github.com/angular/angular-cli).

It is composed of the [view](https://github.com/QuodFinancial/clean-todo/blob/master/app/src/app/app.component.html) of our application. The [TodoInteractor](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/todo.interactor.ts) from the lib is instanciated by passing the [Gateway Service](https://github.com/QuodFinancial/clean-todo/blob/master/app/src/app/shared/gateway.service.ts) (that implements the [ITodoGateway interface](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/i-todo-gateway.interface.ts)) and the [controller](https://github.com/QuodFinancial/clean-todo/blob/master/app/src/app/app.component.ts#L21) (that implements the [ITodoController interface](https://github.com/QuodFinancial/clean-todo/blob/master/lib/src/i-todo-controller.interface.ts)).

If we wanted to change the way the todos are stored, by doing AJAX calls to a backend for instance, the only impact would be on the [Gateway Service](https://github.com/QuodFinancial/clean-todo/blob/master/app/src/app/shared/gateway.service.ts) to do http calls. Any object that implements the ITodoGateway interface would work, as the interactor has no idea of the implementation of this data access.
