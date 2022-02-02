import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { HorizontalMenuItemComponent } from './horizontal-menu/horizontal-menu-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HorizontalMenuItemComponent,
  ],
  exports: [
    HorizontalCardComponent,
    HorizontalMenuComponent,
    HorizontalMenuItemComponent,
  ],
})
export class SharedModule {}
