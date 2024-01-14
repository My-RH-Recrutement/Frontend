import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {

  constructor(private _authService: AuthService, private _router: Router) {}

  logo: string = "../../../../assets/img/logo.png";

  isUserLoggedin: boolean = this._authService.isAuthenticated;

  isMainMenuOpen: boolean = false;
  isProfileDropDownOpen: boolean = false;

  handleDropDown() {
    this.isProfileDropDownOpen = !this.isProfileDropDownOpen;
  }

  handleLogOut = () => {
    this._authService.logout();
    this._router.navigate(["/auth/login"]); 
  }
}
