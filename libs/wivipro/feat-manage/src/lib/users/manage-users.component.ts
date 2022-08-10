import { Component } from '@angular/core';
import {
  AppUser,
  AuthService,
  ModalService,
  NotificationService,
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
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }

  addUser = (): void => {
    const title = 'Nieuwe gebruiker';
    this.modalService
      .showOffCanvas<UserOffCanvasComponent, AppUser>(
        UserOffCanvasComponent,
        { title },
        {}
      )
      .pipe(take(1))
      .subscribe((res) => {
        if (res.Success && res.Data) {
          const usr = res.Data;
          const { email, password } = usr;
          if (email && password) {
            // create an auth user with authservice
            // only after that is complete (hence concatMap), create a user object in the firestore 'users' collection
            this.authService
              .createUser(email, password)
              .pipe(
                concatMap((credential) => {
                  usr.uid = credential.user.uid;
                  return this.userService.set(usr);
                })
              )
              .subscribe((x) => console.log(x));
          }
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
        if (res.Success && res.Data) {
          this.userService.set(res.Data).subscribe((u) => {
            this.notificationService.success(
              `User successfully updated to ${JSON.stringify(u)}`
            );
            this.getUsers();
          });
        }
      });
  };
}
