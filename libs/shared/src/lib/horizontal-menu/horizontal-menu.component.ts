import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { HorizontalMenuItemComponent } from './horizontal-menu-item.component';

@Component({
  selector: 'geerts-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
})
export class HorizontalMenuComponent implements AfterContentInit {
  @ContentChildren(HorizontalMenuItemComponent)
  items!: QueryList<HorizontalMenuItemComponent>;

  @Input() class = '';

  constructor() {
    //empty
  }

  ngAfterContentInit() {
    console.log(this.items?.length);
  }
}
