import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@geerts/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage.component';
import { ManageUsersComponent } from './users/manage-users.component';
import { ManageOrdersComponent } from './orders/manage-orders.component';
import { UserOffCanvasComponent } from './users/offcanvas/user.offcanvas';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageComponent,
        children: [
          {
            path: '',
            redirectTo: 'users',
          },
          {
            path: 'users',
            component: ManageUsersComponent,
          },
          {
            path: 'orders',
            component: ManageOrdersComponent,
          },
        ],
      },
    ]),
  ],
  declarations: [
    ManageComponent,
    ManageUsersComponent,
    ManageOrdersComponent,
    UserOffCanvasComponent,
  ],
  exports: [ManageComponent],
})
export class FeatManageModule {}
