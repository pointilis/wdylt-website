import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SigninService } from '../services/signin/signin.service';

export const AuthenticatedOnlyGuard: CanActivateFn = async (route, state) => {
  const signInService = inject(SigninService);
  const router = inject(Router);

  const isAuthenticated = await signInService.isAuthenticated();
  if (isAuthenticated) {
    return true;
  }
  
  router.navigate(['/'], { replaceUrl: true });
  return false;
};
