import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access } from '@app/core/enums/access';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private _authService: AuthService, private _router: Router, private _toast: ToastService) {}

  formInputs = {
    email: {
      id: 'email',
      name: 'email',
      type: 'email',
      value: '',
      placeholder: 'Email',
      label: 'Email',
      formControll: 'email',
      onChange: "",
      required: true,
      error: ""
    },
    password: {
      id: 'password',
      name: 'password',
      type: 'password',
      value: '',
      placeholder: 'Password',
      label: 'Password',
      formControll: 'password',
      onChange: "",
      required: true,
      error: ""
    }
  }

  login = () => {
    const formData: FormData = new FormData()
    formData.append("email", this.formInputs.email.value);
    formData.append("password", this.formInputs.password.value);
    this._authService.login(formData).subscribe({
      next: (res) => {
        this._authService.loadUserProfile(res);
        if (this._authService.roles.includes(Access.RECRUITER)) {
          this._router.navigate(["/recruiter/jobs"]);
        }else {
          this._router.navigate(["/"]);
        }
      },
      error: ({error}) => {
        error?.body?.detail ? this._toast.error(error.body.detail) : false;
        this.formInputs.email.error = error.email;
        this.formInputs.password.error = error.password;
      },
      complete: () => {}
    });
  }
}
