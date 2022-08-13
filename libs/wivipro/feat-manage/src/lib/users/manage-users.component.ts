import { Component } from '@angular/core';
import {
  AppUser,
  ModalService,
  NotificationService,
  sortByProp,
  UserApi,
} from '@geerts/shared';
import { UserOffCanvasComponent } from './offcanvas/user.offcanvas';

@Component({
  selector: 'geerts-manage',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users!: AppUser[];

  constructor(
    private userApi: UserApi,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.userApi.getAll().subscribe((users) => {
      this.users = sortByProp(users, 'displayName');
    });
  }

  addUser = (): void => {
    const title = 'Nieuwe gebruiker';
    this.modalService
      .showOffCanvas<UserOffCanvasComponent, AppUser>(UserOffCanvasComponent, {
        title,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.Success) {
          this.getUsers();
        }
      });
  };

  editUser = (usr: AppUser): void => {
    const title = `Gebruiker '${usr.displayName}' aanpassen`;
    this.modalService
      .showOffCanvas<UserOffCanvasComponent, AppUser>(UserOffCanvasComponent, {
        usr,
        title,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.Success) {
          this.getUsers();
        }
      });
  };

  deleteUser = (usr: AppUser): void => {
    //TODO confirmdeletedialog/offcanvas?
    //TODO api call
    console.log('delete', usr);
    this.notificationService.error('something went wrong');
  };

  //split to some utils file

  // private sortByProp<T, K extends keyof T>(values: T[], orderType: K): T[] {
  //   return values.sort((a, b) =>
  //     a[orderType] > b[orderType] ? 1 : b[orderType] > a[orderType] ? -1 : 0
  //   );
  // }
}
