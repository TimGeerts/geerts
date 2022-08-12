import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AppUser,
  AuthService,
  ModalService,
  NotificationService,
  UserApi,
  UserService,
} from '@geerts/shared';
import { catchError, concatMap, take } from 'rxjs/operators';
import { UserOffCanvasComponent } from './offcanvas/user.offcanvas';

@Component({
  selector: 'geerts-manage',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users!: AppUser[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private userApi: UserApi,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.userApi.getAll().subscribe((users) => {
      this.users = users;
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
  };
}
