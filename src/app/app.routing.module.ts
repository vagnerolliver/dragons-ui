import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const AppRoutes: Routes = [
    {
        path: '',
        loadChildren: './home/home.module#HomeModule',
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

export class AppRoutingModule {
}
