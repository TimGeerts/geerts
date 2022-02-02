import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@geerts/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'about',
          pathMatch: 'full',
        },

        {
          path: 'about',
          loadChildren: () =>
            import('@geerts/wivipro/feat-about').then(
              (module) => module.FeatAboutModule
            ),
        },
        {
          path: 'creations',
          loadChildren: () =>
            import('@geerts/wivipro/feat-creations').then(
              (module) => module.FeatCreationsModule
            ),
        },
        {
          path: 'wholesale',
          loadChildren: () =>
            import('@geerts/wivipro/feat-wholesale').then(
              (module) => module.FeatWholesaleModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
