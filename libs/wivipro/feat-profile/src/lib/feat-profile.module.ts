import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@geerts/shared';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProfileComponent },
    ]),
  ],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class FeatProfileModule {}
