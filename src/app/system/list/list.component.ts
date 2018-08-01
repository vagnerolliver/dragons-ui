import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';

import { ErrorHandlerService } from '../../services/errorHandler.service';
import { SystemService } from '../system.service';
import { Dragon } from '../model/dragon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, DoCheck  {

  subscription: Subscription;

  shouldReload: boolean;

  dragons: Dragon;
  filterPage: number = 0; 
  pages: Object;

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
          this.dragons = data.items; 
          this.pages = this.pagination(data._metadata.total_count / data._metadata.per_page );
        },
        (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
    );
  }

  deleteDragon(slug): void {
    this.subscription = this.systemService.deteleDragon(slug).subscribe(
        (data: any) => { 
          this.toastr.success('Delete Success!', 'Dragons');
          this.filterPage = 0;
          this.systemService.reloadList();
          
         },
         (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Delete Dragons')
      );
  }

  buildParams() {
    const paramsObj = {
        page: this.filterPage >= 0 ? this.filterPage : '1',
    };
    return paramsObj;
  }

  addPage(item) { 
    this.filterPage = item;
    this.fetchDragons();
  }

  nextPage() {
    this.filterPage++;
    this.fetchDragons();
  }

  prevPage() {
    this.filterPage--;
    this.fetchDragons();
  }
  
  pagination(number) {
    const _number = Math.ceil(number);
    const array = [];
    for ( let i = 0; i < _number; i++) {
        array.push(i);
    }
    return array;
  }
}
