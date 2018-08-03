import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { SystemService } from '../system.service';
import { ErrorHandlerService } from '../../services/errorHandler.service';
import { Dragon } from '../model/dragon';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  subscription: Subscription;

  dragon;

  constructor(
    @Inject(DOCUMENT) public document: any,
    private systemService: SystemService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService
  ) {}

  open() {
    document.body.classList.add('open-modal');
    this.fetchDragon(this.systemService.slug);
  }

  close() {
    document.body.classList.remove('open-modal');
    this.dragon = [];
    this.subscription.unsubscribe();
  }

  fetchDragon(slug): void {
    this.subscription = this.systemService.getDragon(slug).subscribe(
        (data: Dragon) => this.dragon = data,
        error => this.toastr.error(this.errorHandler.messageTo(error), 'Detalhes Dragão')
      );
  }
}
