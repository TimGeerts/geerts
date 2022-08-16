import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  AppUser,
  AuthApi,
  ModalService,
  NotificationService,
  sortByProp,
  UserApi,
} from '@geerts/shared';
import { UserOffCanvasComponent } from './offcanvas/user.offcanvas';
import { concatMap, switchMap } from 'rxjs/operators';
import { NEVER } from 'rxjs';

@Component({
  selector: 'geerts-manage',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  @ViewChild('confirmDeleteUser') confirmDeleteUser!: TemplateRef<Element>;

  users!: AppUser[];
  loading = false;

  constructor(
    private userApi: UserApi,
    private authApi: AuthApi,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.notificationService.showLoading();
    this.userApi.getAll().subscribe((users) => {
      this.users = sortByProp(users, 'displayName');
      this.notificationService.hideLoading();
    });
  }

  addUser = (): void => {
    const title = 'Nieuwe gebruiker';
    this.modalService
      .showOffCanvas<UserOffCanvasComponent, AppUser>(UserOffCanvasComponent, {
        title,
      })
      .subscribe((res) => {
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
        if (res.Success) {
          this.getUsers();
        }
      });
  };

  deleteUser = (u: AppUser): void => {
    this.modalService
      .confirmDeleteWithTemplate(this.confirmDeleteUser)
      .pipe(
        switchMap((r) => {
          if (r.Success) {
            this.loading = this.notificationService.showLoading();
            return this.userApi.delete(u.uid).pipe(
              concatMap((_) => {
                return this.authApi.delete(u.uid);
              })
            );
          } else {
            return NEVER;
          }
        })
      )
      .subscribe({
        next: (r) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.success('Gebruiker verwijderd');
          this.getUsers();
        },
        error: (e) => {
          this.loading = this.notificationService.hideLoading();
          this.notificationService.handleApiError(e);
        },
      });
  };
}
