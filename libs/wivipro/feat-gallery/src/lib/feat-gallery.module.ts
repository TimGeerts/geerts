import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@geerts/shared';
import { GalleryComponent } from './gallery.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GalleryComponent },
    ]),
  ],
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
})
export class FeatGalleryModule {}
