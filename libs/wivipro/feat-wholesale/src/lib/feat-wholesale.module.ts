import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@geerts/shared';
import { WholesaleComponent } from './wholesale.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WholesaleComponent },
    ]),
  ],
  declarations: [WholesaleComponent],
  exports: [WholesaleComponent],
})
export class FeatWholesaleModule {}
