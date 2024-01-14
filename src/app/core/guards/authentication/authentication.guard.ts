import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuthenticated) {
    return true;
  }
  router.navigate(["/auth/login"]);
  return false;
};
