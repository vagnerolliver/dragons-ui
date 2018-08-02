import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guards/auth.guards';
import { Cnt } from './services/cnt';
import { AuthService } from './services/auth.service';
import { ErrorHandlerService } from './services/errorHandler.service';
import { SystemContentService } from './services/system-content.service';

import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';
import { AppRoutingModule } from './app-routing.module';
import { BaseModule } from './base/base.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BaseModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({}),
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    AuthGuard,
    Cnt,
    AuthService,
    ErrorHandlerService,
    SystemContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
