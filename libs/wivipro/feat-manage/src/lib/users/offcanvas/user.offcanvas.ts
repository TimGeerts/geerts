import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppUser } from '@geerts/shared';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'geerts-user-offcanvas',
  templateUrl: './user.offcanvas.html',
})
export class UserOffCanvasComponent implements OnInit {
  usr!: AppUser;
  title!: string;
  action: 'create' | 'update' = 'create';
  actionLabel = 'Aanpassen';

  form = this.fb.group({
    email: ['x', Validators.required],
    displayName: ['x', Validators.required],
  });

  //TODO usr is not "something" yet in constructor, so formbuilding goes to SHIT!
  constructor(
    private activeOffCanvas: NgbActiveOffcanvas,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.usr && this.usr.email) {
      this.action = 'update';
      this.actionLabel = 'Aanpassen';
    }
    this.usr = this.usr || {
      email: '',
      password: '',
      displayName: '',
      role: 'member',
    };
    this.initForm();
  }

  private initForm(): void {
    this.form.setValue({
      email: this.usr.email,
      displayName: this.usr.displayName,
    });
  }

  ok(): void {
    const newUsr = {
      email: this.form.get('email')?.value,
      displayName: this.form.get('displayName')?.value,
    };
    const ret: AppUser = { ...this.usr, ...newUsr };
    this.activeOffCanvas.close(ret);
  }

  cancel(): void {
    this.activeOffCanvas.dismiss();
  }
}
