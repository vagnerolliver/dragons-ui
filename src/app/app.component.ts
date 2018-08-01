import { Component, OnInit, DoCheck } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {

  isLogged = this.authService.isLogged();

  constructor(
    private authService: AuthService
  ) { }

  ngDoCheck() {
    this.isLogged = this.authService.isLogged();
  }
}
