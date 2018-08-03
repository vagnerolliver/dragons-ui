import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent, pathMatch: 'full'}
    ]),
    FormsModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
