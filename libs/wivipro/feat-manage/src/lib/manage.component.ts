import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '@geerts/shared';

@Component({
  selector: 'geerts-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  menuItems: IMenuItem[] = new Array<IMenuItem>();

  ngOnInit(): void {
    this.initMenu();
  }

  private initMenu(): void {
    this.menuItems = [
      {
        label: 'Gebruikers',
        routerLink: './users',
      },
      {
        label: 'Bestellingen',
        routerLink: './orders',
      },
    ];
  }
}
