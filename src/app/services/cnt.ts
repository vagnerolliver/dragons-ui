import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

@Injectable()
export class Cnt { 
  // Microservices 
  private dragonsBaseUrl = 'https://dragons-api.herokuapp.com/api/';

  // Input Options
  constructor(private http: HttpClient) { }

  connectTo(service, url) {
   return this.getEndingPoint(service) + url;
  }

  getEndingPoint(serviceType) {
    if (serviceType === 'dragons') {
      return this.dragonsBaseUrl;
    }  
  }
}
