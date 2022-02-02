import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { RouterModule } from '@angular/router';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';

export * from './types/menu-item';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
  ],
  exports: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
  ],
})
export class SharedModule {}
