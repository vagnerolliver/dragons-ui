import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SystemContentService } from '../../services/system-content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  document = this.systemContentService.document;
  
  userLogout = false;
  userName: string;

  constructor(
    private systemContentService: SystemContentService,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  ngDoCheck() {
    this.userName = this.authService.loggedUserName();
  }

  logout() {
    this.authService.logout();
  }

  isToggleLogout() { 
    this.userLogout = !this.userLogout;
  }
}
