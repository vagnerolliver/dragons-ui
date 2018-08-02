import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';

import { ErrorHandlerService } from '../../services/errorHandler.service';
import { SystemService } from '../system.service';
import { Dragon } from '../model/dragon';
import { ToastrService } from 'ngx-toastr';
import { SystemContentService } from '../../services/system-content.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, DoCheck  {

  subscription: Subscription;

  shouldReload: boolean; 
  
  filterPage: number = 0; 
  dragons = []; 
  totalNewDragons = [];
  page: 1;

  constructor(
    private systemService: SystemService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService,
    private systemContentService: SystemContentService
  ) { }

  ngOnInit() {
    this.systemService.addTitle('All Dragons');

    this.systemService.shouldReloadList.subscribe(
      shouldReload => this.shouldReload = shouldReload
    );

    this.fetchTotalDragons();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck() {
    if (this.shouldReload) {
      this.shouldReload = false;
      this.fetchTotalDragons();
    }
  }

  moutNewObject(i): void {
    this.filterPage = i;
    this.systemService.getDragons(this.buildParams()).subscribe(
      (data: any) => {
        data.items.forEach((dragon, i) => {
          if( dragon.name.trim().length > 0 ) {
            this.totalNewDragons.push(i)
            this.dragons.push(dragon);
          }
        }) 
      }
    );
  }

  fetchTotalDragons(): void {
    this.subscription = this.systemService.getDragons(this.buildParams()).subscribe(
        (data: any) => { 
          this.dragons = [];
          this.pagination(data._metadata.total_count / data._metadata.per_page );
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
    this.fetchTotalDragons();
  }

  pagination(number) {
    const _number = Math.ceil(number);
    const array = [];
    for ( let i = 0; i < _number; i++) {
        array.push(i);
        this.moutNewObject(i); 
    }
    return array;
  }

  openModal(obj, id) {
    this.systemContentService.openSmartModal(obj, id);
  }

  fetchDragon(slug): void {
    console.info(slug);
    this.subscription = this.systemService.getDragon(slug).subscribe(
        (data: any) => {
          console.info(data);
          this.openModal(data, 'detailsModal');
          this.systemService.addTitle(`Dragons - ${data.name}`);
         },
         (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
      );
  }
}
