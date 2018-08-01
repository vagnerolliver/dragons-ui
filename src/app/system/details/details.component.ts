import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Dragon } from '../model/dragon';
import { SystemService } from '../system.service';
import { SystemContentService } from '../../services/system-content.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from '../../services/errorHandler.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  routeSubscription: Subscription;

  dragon: Dragon;

  constructor(
    private systemService: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(
      (params) => {
        if (params['slug']) {
          this.fetchDragon(params['slug']);
        } else {
          this.toastr.error('Ocorreu um erro inesperado.', 'System Dragons');
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  fetchDragon(slug): void {
    this.subscription = this.systemService.getDragon(slug).subscribe(
        (data: any) => {
          this.dragon = data;
          this.systemService.addTitle(`Dragons - ${data.name}`);
         },
         (error) => this.toastr.error(this.errorHandler.messageTo(error), 'Get Dragons')
      );
  }

}
