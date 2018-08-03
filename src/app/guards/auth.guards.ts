import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
    @Inject(DOCUMENT) public document: any,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canAccess();
  }

  private canAccess(): boolean {
    if (localStorage.getItem('logged') === 'true') {
      this.document.body.classList.remove('page-login');
      return true;
    }
    this.toastr.error('Acesso Negado!', 'Dragons System');
    this.document.body.classList.add('page-login');
    this.router.navigate(['/']);
    return false;
  }
}
