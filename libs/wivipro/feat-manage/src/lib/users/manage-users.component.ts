import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  AppUser,
  AuthFunctions,
  UserFunctions,
  ModalService,
  NotificationService,
  sortByProp,
  queryByProps,
} from '@geerts/shared';
import { UserOffCanvasComponent } from './offcanvas/user.offcanvas';
import { switchMap } from 'rxjs/operators';
import { NEVER } from 'rxjs';

@Component({
  selector: 'geerts-manage',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent {
  @ViewChild('confirmDeleteUser') confirmDeleteUser!: TemplateRef<Element>;

  users!: AppUser[];
  filteredUsers!: AppUser[];
  loading = false;

  constructor(
    private authFunctions: AuthFunctions,
    private userFunctions: UserFunctions,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.getUsers();
  }

  getUsers(): void {
    this.notificationService.showLoading();
    this.userFunctions.getUsers().subscribe((users) => {
      this.users = sortByProp(users, 'displayName');
      this.filteredUsers = this.users;
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
    const req = {
      uid: u.uid,
    };
    this.modalService
      .confirmDeleteWithTemplate(this.confirmDeleteUser)
      .pipe(
        switchMap((r) => {
          if (r.Success) {
            this.loading = this.notificationService.showLoading();
            return this.authFunctions.deleteUser(req);
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
          this.notificationService.handleCallableFunctionError(e);
        },
      });
  };

  filterUsers = (query: string): void => {
    if (!query || !query.length) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = queryByProps(this.users, query, [
        'customerNumber',
        'displayName',
        'contactName',
        'email',
      ]);
    }
  };
}
