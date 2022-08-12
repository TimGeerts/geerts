import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthGuard, SharedModule } from '@geerts/shared';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserModule,
    SharedModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    ReactiveFormsModule,
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
        {
          path: 'login',
          loadChildren: () =>
            import('@geerts/wivipro/feat-login').then(
              (module) => module.FeatLoginModule
            ),
        },
        {
          path: 'manage',
          canActivate: [AuthGuard],
          loadChildren: () =>
            import('@geerts/wivipro/feat-manage').then(
              (module) => module.FeatManageModule
            ),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'enabled',
      }
    ),
  ],
  providers: [{ provide: 'apiBaseUrl', useValue: environment.api_baseurl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
