import { Component } from '@angular/core';

@Component({
  selector: 'geerts-cofirm-reset-password',
  template: `
    <div class="text-center">
      <p>Je staat op het punt om het paswoord te resetten.</p>
      <p class="small">
        Hierdoor zal de gebruiker niet meer kunnen inloggen met zijn huidig
        paswoord.
      </p>
      <p class="mb-0 mt-3">Weet je zeker dat dit correct is?</p>
    </div>
  `,
})
export class ConfirmResetPasswordComponent {}
