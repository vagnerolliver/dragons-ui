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
import { SystemContentService } from '../services/system-content.service';

@Injectable()
export class AuthGuard implements CanActivate {

  document = this.systemContentService.document;

  constructor(
    private systemContentService: SystemContentService,
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
      this.document.body.classList.remove('page-login');
      return true;
    }
    this.toastr.error('Acesso Negado!', 'Dragons System');
    this.document.body.classList.add('page-login');
    this.router.navigate(['/']);
    return false;
  }
}
