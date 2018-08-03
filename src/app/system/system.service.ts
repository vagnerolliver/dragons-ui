import { EventEmitter, Injectable, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Cnt } from '../services/cnt';
import { NgxSmartModalService } from 'ngx-smart-modal';

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
    private cnt: Cnt,
    public ngxSmartModalService: NgxSmartModalService
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

    return this.http.get(this.cnt.connectTo('dragons'), httpOptions);
  }

  sendDragonInformation(action, formData) {
    formData['histories']  = this.normalizeChip(formData.histories);
    if (action === 'new') {
      return this.http.post(this.cnt.connectTo('dragons'), formData);
    } else {
      return this.http.put(this.cnt.connectTo(`dragons/${this.slug}`), formData);
    }
  }

  getDragon(slug) {
    return this.http.get(this.cnt.connectTo(`dragons/${slug}`));
  }

  deteleDragon(slug) {
    return this.http.delete(this.cnt.connectTo(`dragons/${slug}`));
  }

  openSmartModal(obj, id) {
    if ( obj == null ) { obj = {}; }

    this.ngxSmartModalService.setModalData(obj, id, true);
    this.ngxSmartModalService.getModal(id).open();
  }

  addTitle(title) {
    this.title.setTitle(title);
  }

  normalizeChip(array) {
    return array.map(item => {
      return (!!item.value) ? item.value : item;
    });
  }
}
