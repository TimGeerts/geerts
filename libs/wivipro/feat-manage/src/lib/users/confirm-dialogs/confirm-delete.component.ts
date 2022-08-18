import { Component } from '@angular/core';

@Component({
  selector: 'geerts-cofirm-delete-user',
  template: `
    <div class="text-center">
      <p>Je staat op het punt om een gebruiker te verwijderen.</p>
      <p class="small">Dit kan niet ongedaan worden.</p>
      <p class="mb-0 mt-3">Weet je zeker dat dit correct is?</p>
    </div>
  `,
})
export class ConfirmDeleteUserComponent {}
