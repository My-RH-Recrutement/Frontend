import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Access } from '@app/core/enums/access';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {

  constructor(private _authService: AuthService, private _router: Router, private _toast: ToastService) { }
  access = Access;
  file!: File;
  role:string = this.access.USER;
  formInputs = {
    name: {
      id: 'fulName',
      name: 'fullName',
      type: 'text',
      value: '',
      placeholder: 'Full Name',
      label: 'Full Name',
      formControll: 'fullName',
      onChange: "",
      required: true,
      error: ""
    },
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
    },
    phone: {
      id: 'phone',
      name: 'phone',
      type: 'tele',
      value: '',
      placeholder: 'Phone Number',
      label: 'Phone Number',
      formControll: 'phone',
      onChange: "",
      required: true
    },
    address: {
      id: 'address',
      name: 'address',
      type: 'text',
      value: '',
      placeholder: 'Address',
      label: 'Address',
      formControll: 'address',
      onChange: "",
      required: true
    },
    file: {
      id: 'file',
      name: 'file',
      type: 'file',
      value: '',
      placeholder: 'Image',
      label: 'Image',
      formControll: 'Image',
      onChange: "",
      required: true
    }
  }

  uploadFile(file: any) {
    this.file = file;
  }

  signUp = () => {
    const formData: FormData = new FormData();
    formData.append("fullName", this.formInputs.name.value);
    formData.append("email", this.formInputs.email.value);
    formData.append("phoneNumber", this.formInputs.phone.value);
    formData.append("password", this.formInputs.password.value);
    formData.append("address", this.formInputs.address.value);
    formData.append("role", this.role);
    if(this.role === this.access.RECRUITER) formData.append("image", this.file);
    
    this._authService.register(formData).subscribe({
      next: (res) => {
        this._authService.loadUserProfile(res);
        this._toast.success("Account created Successfully!");
        this._router.navigate(["/auth/verify"]);
      },
      error: ({error}) => {
        error?.body?.detail ? this._toast.error(error.body.detail) : false;
        this.formInputs.name.error = error.fullName;
        this.formInputs.email.error = error.email;
        this.formInputs.password.error = error.password;
      }
    })
  }
}
