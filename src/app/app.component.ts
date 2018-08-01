import { Component, DoCheck } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  name;
  isLogged;

  constructor(private authService: AuthService) { }

  ngDoCheck() {
    this.name = this.authService.loggedUserName(); 
    this.isLogged = this.authService.isLogged();
  }

  logout() {
    this.authService.logout();
  }
 
}
