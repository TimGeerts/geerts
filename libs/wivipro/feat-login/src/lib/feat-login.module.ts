import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@geerts/shared';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class FeatLoginModule {}
