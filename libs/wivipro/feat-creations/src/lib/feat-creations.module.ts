import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreationsComponent } from './creations.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: CreationsComponent },
    ]),
  ],
  declarations: [CreationsComponent],
  exports: [CreationsComponent],
})
export class FeatCreationsModule {}
