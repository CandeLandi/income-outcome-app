import { CanActivateFn, CanLoad, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  return authService.isAuth()
  .pipe(
    tap( state => {
      if ( !state ) { router.navigate(['/login'])}
    })
  );

  };
