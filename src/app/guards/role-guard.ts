import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  // ✅ Get user from localStorage
  const userData = localStorage.getItem('user');

  if (!userData) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(userData);
  const allowedRoles = route.data?.['roles'] as string[] || [];

  if (allowedRoles.includes(user.role)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};