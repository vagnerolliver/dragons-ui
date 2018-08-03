# DragonsUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

Used dependencies

https://www.npmjs.com/package/ngx-order-pipe 
https://www.npmjs.com/package/ngx-toastr - alert callback error ou sucess
http://michaelbromley.github.io/ngx-pagination/#/ - paginação da lista de dragões
https://www.npmjs.com/package/ngx-smart-modal ´- foi útil para exibir os dados do dragão.

Bug no serviço para retornos todos mos pokemons, alguns dos objetos que o serviço retorna não veio com slug e nome, isso acabou dificultando na hora de limpar a base.

Fiz um bff local para limpar esses objetos e montei eu mesmo ma paginação de dados que eu monto no front.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
