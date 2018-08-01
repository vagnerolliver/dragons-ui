import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guards/auth.guards';
import { Cnt } from './services/cnt';
import { AuthService } from './services/auth.service'; 
import { ErrorHandlerService } from './services/errorHandler.service';

import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule, 
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({}),],
  providers: [
    AuthGuard, 
    Cnt, 
    AuthService,
    ErrorHandlerService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
