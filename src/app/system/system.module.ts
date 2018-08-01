import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

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
  ],
  declarations: [ListComponent, DetailsComponent, FormComponent],
  providers: [SystemService]
})
export class SystemModule { }
