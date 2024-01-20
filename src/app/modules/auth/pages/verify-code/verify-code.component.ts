import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationCode } from '@app/core/models/verification-code';
import { RecruiterService } from '@app/shared/services';
import { InputType } from '@app/shared/types';
import { Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.less']
})
export class VerifyCodeComponent {
  stripe!: Stripe;
  constructor(private _recruiterService: RecruiterService, private _router: Router) {}

  verifyInput: InputType = {
    id: 'code',
    name: 'verifyCode',
    type: 'text',
    value: '',
    placeholder: 'Verification Code',
    label: 'Verification Code',
    formControll: "",
    onChange: "",
    required: true
  }

  submitForm = () => {
    let verificatioCode: VerificationCode = new VerificationCode((this.verifyInput.value as string));
    this._recruiterService.verifyAccount(verificatioCode).subscribe({
      next: (res) => {
        console.log(res);
        // this._router.navigate(["/plans"]);
        // (<any>window).Stripe.card.createToken({
        //   number: form.cardNumber.value,
        //   exp_month: form.expMonth.value,
        //   exp_year: form.expYear.value,
        //   cvc: form.cvc.value
        // }, (status: number, response: any) => {
        //   if (status === 200) {
        //     let token = response.id;
        //     this.chargeCard(token);
        //   } else {
        //     console.log(response.error.message);
        //   }
        // });
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {}
    })
  }
}
