import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor() { }

  public messageTo(error) {
    if (error.status >= 500) {
      return 'Ocorreu um erro desconhecido. Por favor, contate o suporte técnico.';
    } else {
      return error.message;
    }
  }
}
