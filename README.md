# DragonsUi

Sistema que gerencia o cadastro de dragões da api externa https://dragons-api.herokuapp.com/.

Dados Login:
user: admin
senha: admin

para add mais usuários editar adicionar user dentro do "mockedUsers"  /services/auth.service.ts

obj = {
  nome: string,
  email: string,
  password: string
}

## Bug Dragons-api

GET/api/dragons
Api retona cadastros sem "nome" e "slug" e não tem como limpar a base.

Solução: criar mock com todos os items da base eliminando a sujeira da base para montar a páginação dentro da aplicação.

## Installation

## clone the repo
$ git clone https://github.com/vagnerolliver2/dragons-ui my-project

## go into app's directory
$ cd my-project

##install app's dependencies
$ npm install

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
