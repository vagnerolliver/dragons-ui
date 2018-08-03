import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    @Inject(DOCUMENT) public document: any,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/system']);
    } else {
      this.document.body.classList.add('page-login');
    }
  }

  onSubmit() {
    this.authService.authUser(this.password, this.email);
  }
}
