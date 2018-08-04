import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerService } from '../../services/errorHandler.service';
import { SystemService } from '../system.service';
import { Dragon } from '../model/dragon';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, DoCheck  {

  subscription: Subscription;

  shouldReload: boolean;

  paramsPage: Number = 0;
  dragons = new Array<Dragon>();
  page: 1;

  constructor(
    private systemService: SystemService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.systemService.addTitle('All Dragons');

    this.systemService.shouldReloadList.subscribe(
      shouldReload => this.shouldReload = shouldReload
    );

    this.fetchDragons();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck() {
    if (this.shouldReload) {
      this.shouldReload = false;
      this.fetchDragons();
    }
  }

  fetchDragons(): void {
    this.subscription = this.systemService.getDragons(this.buildParams()).subscribe(
        (data: any) => {
          const totalCount = Math.ceil(data._metadata.total_count / data._metadata.per_page);
          this.dragons = [];
          for ( let i = 0; i < totalCount; i++) {
            this.moutNewObject(i);
          }
        },
        error => this.toastr.error(this.errorHandler.messageTo(error), 'Lista Dragões')
    );
  }

  moutNewObject(i): void {
    this.paramsPage = i;
    this.systemService.getDragons(this.buildParams()).subscribe(
      (data: any) => {
        data.items.forEach((dragon) => {
          if (dragon.slug.trim().length > 0 ) {
            this.dragons.push(dragon);
          }
        });
      }
    );
  }

  deleteDragon(slug): void {
    this.subscription = this.systemService.deteleDragon(slug).subscribe(
      data => {
        this.toastr.success('Deletado com Sucesso!', 'Lista Dragões');
        this.paramsPage = 0;
        this.systemService.reloadList();
      },
      error => this.toastr.error(this.errorHandler.messageTo(error), 'Lista Dragões')
    );
  }

  buildParams() {
    const paramsObj = {
      page: this.paramsPage >= 0 ? this.paramsPage : '1',
    };
    return paramsObj;
  }

  openModal(slug, id) {
    this.systemService.slug = slug;
    const obj = {
      slug: slug
    };
    this.systemService.openSmartModal(obj, id);
  }
}
