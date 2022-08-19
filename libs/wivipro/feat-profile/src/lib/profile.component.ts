import { Component, OnDestroy } from '@angular/core';
import {
  AppUser,
  AuthService,
  NotificationService,
  UserFunctions,
} from '@geerts/shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'geerts-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnDestroy {
  $userSub: Subscription;
  user!: AppUser;

  constructor(
    private authenticationService: AuthService,
    private userFunctions: UserFunctions,
    private notificationService: NotificationService
  ) {
    this.$userSub = this.authenticationService.$loggedIn.subscribe(() => {
      const curUser = this.authenticationService.currentUser;
      if (curUser?.uid) {
        this.getUser(curUser.uid);
      }
    });
  }

  getUser(uid: string): void {
    this.notificationService.showLoading();
    this.userFunctions.getUser({ uid }).subscribe((user) => {
      this.user = user;
      this.notificationService.hideLoading();
    });
  }

  ngOnDestroy(): void {
    this.$userSub && this.$userSub.unsubscribe();
  }
}
