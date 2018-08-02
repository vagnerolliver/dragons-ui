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
export class DetailsComponent {}
