import { EventEmitter, Injectable, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Cnt } from '../services/cnt';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  @Output() shouldReloadList: EventEmitter<boolean> = new EventEmitter();
 
  public paginacao: any;

  public slug;
  
  constructor(
    private http: HttpClient,
    private title: Title,
    private cnt: Cnt
  ) { }

  reloadList() { 
    this.shouldReloadList.emit(true);
  }

  getDragons(params: any) {
    let httpParams = new HttpParams();

    Object.keys(params).map( k => {
      httpParams = httpParams.append(k, params[k]);
    });

    if (params.page < 0) {
      httpParams = httpParams.append('page', '1'); 
    }

    const httpOptions = {
      params: httpParams
    };

    return this.http.get(this.cnt.connectTo(
      'dragons', 'dragons'
    ), httpOptions);
  }

  sendDragonInformation(action, formData) {
    if (action === 'new') {
        return this.http.post(this.cnt.connectTo(
          'dragons', 'dragons'
        ), formData);
    } else {
      return this.http.put(this.cnt.connectTo(
          'dragons',`dragons/${this.slug}`
        ), formData);
    }
  }

  getDragon(slug) {
    return this.http.get(this.cnt.connectTo(
      'dragons', `dragons/${slug}`
    ));
  }

  deteleDragon(slug) {
    return this.http.delete(this.cnt.connectTo(
      'dragons', `dragons/${slug}`
    ));
  }

  addTitle(title) {
    this.title.setTitle(title);
  }
}
