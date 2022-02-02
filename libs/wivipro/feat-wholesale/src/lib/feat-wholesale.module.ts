import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WholesaleComponent } from './wholesale.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WholesaleComponent },
    ]),
  ],
  declarations: [WholesaleComponent],
  exports: [WholesaleComponent],
})
export class FeatWholesaleModule {}
