import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { GalleryComponent } from './gallery/gallery.component';

export * from './types/menu-item';
export * from './types/gallery-image';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    GalleryComponent,
  ],
  exports: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    GalleryComponent,
  ],
})
export class SharedModule {}
