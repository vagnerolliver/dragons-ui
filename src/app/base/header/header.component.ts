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

  name;

  constructor(
    private systemContentService: SystemContentService,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  ngDoCheck() {
    this.name = this.authService.loggedUserName();
  }

  logout() {
    this.authService.logout();
  }
}
