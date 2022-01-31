import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '@geerts/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomeComponent },
    ]),
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
