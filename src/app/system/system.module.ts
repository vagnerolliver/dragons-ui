import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent, DetailsComponent, FormComponent]
})
export class SystemModule { }
