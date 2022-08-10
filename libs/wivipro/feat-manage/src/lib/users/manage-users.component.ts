import { Component } from '@angular/core';
import {
  AppUser,
  ModalService,
  NotificationService,
  UserService,
} from '@geerts/shared';
import { take } from 'rxjs/operators';
import { UserOffCanvasComponent } from './offcanvas/user.offcanvas';

@Component({
  selector: 'geerts-manage',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  users!: AppUser[];

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
    });
  }

  addUser = (): void => {
    const title = 'Gebruiker aanmaken';
    this.modalService
      .showOffCanvas<UserOffCanvasComponent, boolean>(
        UserOffCanvasComponent,
        { title },
        {}
      )
      .pipe(take(1))
      .subscribe((res) => {
        if (res.Success) {
          // TODO create an actual auth user with authservice
          // 'createUserWithEmailAndPassword'
          // after that is successful, use the uid to set a user document (with this.userService.set(res.Data))
          console.log(JSON.stringify(res, null, 1));
        }
      });
  };

  editUser = (usr: AppUser): void => {
    const title = `Gebruiker '${usr.displayName}' aanpassen`;
    this.modalService
      .showOffCanvas<UserOffCanvasComponent, AppUser>(
        UserOffCanvasComponent,
        { usr, title },
        {}
      )
      .pipe(take(1))
      .subscribe((res) => {
        if (res.Success) {
          this.userService.set(res.Data).subscribe((u) => {
            this.notificationService.success(
              `user successfully updated to ${JSON.stringify(u)}`
            );
            this.getUsers();
          });
        }
      });
  };
}
