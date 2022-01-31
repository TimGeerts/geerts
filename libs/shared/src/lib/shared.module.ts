import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalCardComponent } from './horizontal-card/horizontal-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HorizontalCardComponent
  ],
  exports: [
    HorizontalCardComponent
  ],
})
export class SharedModule {}
