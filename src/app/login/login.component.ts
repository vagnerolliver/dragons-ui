import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SystemContentService } from '../services/system-content.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  document = this.sytemContentService.document;

  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sytemContentService: SystemContentService
  ) { }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/system']);
    }
  }

  onSubmit() {
    this.authService.authUser(this.password, this.email);
  }
}
