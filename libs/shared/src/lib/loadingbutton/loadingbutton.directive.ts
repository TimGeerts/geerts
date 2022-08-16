import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

const classSpinning = 'fa-spin';
const classLoadingIcon = 'fas fa-circle-notch';

@Directive({
  selector: '[geertsLoadingButton]',
})
export class LoadingbuttonDirective implements AfterViewInit {
  private _showSpinner = false;
  private _disabled!: boolean;
  private icon!: HTMLElement;
  private originalClass!: string;

  @Input() set disabled(isDisabled: boolean) {
    this._disabled = isDisabled;
    if (!this._showSpinner) {
      this.el.nativeElement.disabled = isDisabled;
    }
  }

  @Input()
  set loading(showSpinner: boolean) {
    this.do(showSpinner);
  }
  get loading(): boolean {
    return this._showSpinner;
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.do(this._showSpinner);
  }

  private registerOrCreateIcon() {
    const button = this.el.nativeElement as HTMLButtonElement;
    this.originalClass =
      this.originalClass ||
      ((button.getElementsByTagName('i') || [])[0] || {}).className;
    this.icon = this.icon || button.querySelector('i');
    if (!this.icon) {
      const insertedIcon = document.createElement('i');
      button.appendChild(insertedIcon);
      this.icon = insertedIcon;
    }
  }

  private start() {
    const button = this.el.nativeElement as HTMLButtonElement;
    button.disabled = true;

    this.renderer.setAttribute(
      this.icon,
      'class',
      `${classLoadingIcon} ${classSpinning}`
    );
  }

  private stop() {
    this.renderer.setAttribute(this.icon, 'class', this.originalClass);
    this.el.nativeElement.disabled = this._disabled;
  }

  private do(start: boolean = false) {
    this.registerOrCreateIcon();
    this._showSpinner = start;
    if (this.icon) {
      start ? this.start() : this.stop();
    }
  }
}
