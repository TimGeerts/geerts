import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@geerts/shared';
import { GalleryComponent } from './gallery.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GalleryComponent },
    ]),
  ],
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
})
export class FeatGalleryModule {}
