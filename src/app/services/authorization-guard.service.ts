import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ErrorDialogService } from './error-dialog.service';

export const authorizationGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const errorDialogService = inject(ErrorDialogService);

  const requiredRoles = route.data?.['roles'];
  /*const userRoles = authService.getUserRoles();

  const hasAccess = requiredRoles ? requiredRoles.some((role: string) => userRoles.includes(role)) : true;

  if (!hasAccess) {
    errorDialogService.openDialog('Non sei autorizzato ad accedere a questa pagina!');
    router.navigate(['/login']);
    return false;
  }
*/
  return false;
};
