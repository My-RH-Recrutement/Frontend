import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Access } from '@app/core/enums/access';
import { AuthService } from '@app/shared/services/auth/auth.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.roles.includes(Access.RECRUITER)) {
    return true;
  }
  router.navigate(["/not-authorized"]);
  return false;
};
