import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.roles.includes("ADMIN")) {
    return true;
  } else {
    // Rediriger vers la page de login si non authentifié
    router.navigateByUrl('/admin/notAuthorized');
    return false;
  }
  return true;
};
