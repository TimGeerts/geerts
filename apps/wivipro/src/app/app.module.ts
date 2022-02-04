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
          data: { title: 'Creaties', folder: 'creations' },
          loadChildren: () =>
            import('@geerts/wivipro/feat-gallery').then(
              (module) => module.FeatGalleryModule
            ),
        },
        {
          path: 'gifts',
          data: { title: 'Geschenken', folder: 'gifts' },
          loadChildren: () =>
            import('@geerts/wivipro/feat-gallery').then(
              (module) => module.FeatGalleryModule
            ),
        },
        {
          path: 'wholesale',
          loadChildren: () =>
            import('@geerts/wivipro/feat-wholesale').then(
              (module) => module.FeatWholesaleModule
            ),
        },
        {
          path: 'gallery',
          loadChildren: () =>
            import('@geerts/wivipro/feat-gallery').then(
              (module) => module.FeatGalleryModule
            ),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'enabled',
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
