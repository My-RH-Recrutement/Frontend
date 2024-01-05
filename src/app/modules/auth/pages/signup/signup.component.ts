import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '@app/shared/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent {

  constructor(private _recruiterService: RecruiterService, private _router: Router) { }
  file!: File;
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
      required: true
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
      required: true
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
      required: true
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
    formData.append("image", this.file);
    formData.append("address", this.formInputs.address.value);

    this._recruiterService.create(formData).subscribe({
      next: (res) => {
        this._router.navigate(["/auth/verify"]);
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
