import { Title } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable()
export class SystemContentService {
  constructor(
    private title: Title,
    @Inject(DOCUMENT) public document: any,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  addTitle(title) {
    this.title.setTitle(title);
  }

  openSmartModal(obj, id) { ;
    if ( obj == null ) { obj = {}; }

    this.ngxSmartModalService.setModalData(obj, id, true);
    this.ngxSmartModalService.getModal(id).open();
  }
}