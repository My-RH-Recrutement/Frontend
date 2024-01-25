import { Component } from '@angular/core';
import { LoginRequestInterface } from '@app/core/interfaces/requests/login-request.interface';
import { authPageActions } from '@app/ngrx/auth/actions/auth-page.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(private _store: Store) {}

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
    const loginRequest: LoginRequestInterface = {
      email: this.formInputs.email.value,
      password: this.formInputs.password.value
    }
    this._store.dispatch(authPageActions.login(loginRequest))
  }
}
