import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guards';

export const AppRoutes: Routes = [
  { path: '',
    loadChildren: './login/login.module#LoginModule',
    pathMatch: 'full'
  },
  { path: 'system',
    loadChildren: './system/system.module#SystemModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      AppRoutes,
      {
        // enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
