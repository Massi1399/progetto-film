import { inject} from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

import { ErrorDialogService } from './error-dialog.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const errorDialogService = inject(ErrorDialogService);

    errorDialogService.openDialog('Non sei autorizzato ad accedere a questa pagina!');
    router.navigate(['/registration']);
    return false;
  
};  




/*@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.currentUserValue) {
      // User is authenticated
      return true;
    } else {
      // Redirect to login page if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(next, state);
}*/