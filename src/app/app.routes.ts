import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'guest/report',
    loadComponent: () => import('./pages/guest/guest-report.page').then(m => m.GuestReportPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'civilian/dashboard',
    loadComponent: () => import('./pages/civilian/dashboard/dashboard.page').then(m => m.DashboardPage)
  }
];