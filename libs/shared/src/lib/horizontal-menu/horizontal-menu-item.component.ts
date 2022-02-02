import { Component, Input } from '@angular/core';

@Component({
  selector: 'geerts-horizontal-menu-item',
  template: '<span></span>',
})
export class HorizontalMenuItemComponent {
  @Input() routerLink!: string;
  @Input() extLink!: string;
  @Input() label!: string;
}
