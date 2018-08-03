import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';

import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SystemRoutingModule } from './system-routing.module';

import { SystemService } from './system.service';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    OrderModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    NgxPaginationModule,
    TagInputModule
  ],
  declarations: [ListComponent, DetailsComponent, FormComponent],
  providers: [SystemService]
})
export class SystemModule { }
