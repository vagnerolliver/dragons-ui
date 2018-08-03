import { Injectable } from '@angular/core';

@Injectable()
export class Cnt {
  private baseUrl = 'https://dragons-api.herokuapp.com/api/';

  connectTo(url) {
   return `${this.baseUrl}/${url}`;
  }
}
