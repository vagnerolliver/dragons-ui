import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  userIsLogged: any;
  userLogout = false;
  userName: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  ngDoCheck() {
    this.userName = this.authService.loggedUserName();
    this.userIsLogged = this.authService.isLogged;
  }

  logout() {
    this.authService.logout();
  }

  isToggleLogout() {
    this.userLogout = !this.userLogout;
  }
}
