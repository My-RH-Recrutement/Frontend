import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationCode } from '@app/core/models/verification-code';
import { RecruiterService } from '@app/shared/services';
import { InputType } from '@app/shared/types';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.less']
})
export class VerifyCodeComponent {

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
        localStorage.setItem("recruiter", JSON.stringify(res.id));
        this._router.navigate(["/recruiter/jobs"]);
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {}
    })
  }
}
