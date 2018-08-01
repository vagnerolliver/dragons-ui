import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, 
          CanActivate, 
          CanLoad, 
          Route, 
          Router, 
          RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canAccess();
  }

  private canAccess(): boolean {
    if (localStorage.getItem('logged') === 'true') {
      this.toastr.success('Olá! Seja Bem Vindo!', 'Dragons System');
      return true;
    }
    this.toastr.error('Acesso Negado!', 'Dragons System');
    this.router.navigate(['/']);
    return false;
  }
}
