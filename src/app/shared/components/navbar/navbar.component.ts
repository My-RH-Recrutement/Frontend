import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { authPageActions } from '@app/ngrx/auth/actions/auth-page.actions';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {

  constructor(private _authService: AuthService, private _router: Router, private _store: Store) {}

  logo: string = "../../../../assets/img/logo.png";

  isUserLoggedin: boolean = this._authService.isAuthenticated;

  isMainMenuOpen: boolean = false;
  isProfileDropDownOpen: boolean = false;

  handleDropDown() {
    this.isProfileDropDownOpen = !this.isProfileDropDownOpen;
  }

  handleLogOut = () => {
    this._store.dispatch(authPageActions.logout())
  }
}
