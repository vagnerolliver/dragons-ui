import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService
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
