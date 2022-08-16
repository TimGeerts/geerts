import { Component } from '@angular/core';

@Component({
  selector: 'geerts-delete-user-warning',
  template: `
    <div class="text-center">
      <p>
        Je staat op het punt om een gebruiker te verwijderen.
        <br />
        Dit kan niet ongedaan worden.
      </p>
      <p class="mb-0 mt-3">Weet je zeker dat dit correct is?</p>
    </div>
  `,
})
export class DeleteUserWarningComponent {}
