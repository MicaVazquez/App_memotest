import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'mesa',
    loadComponent: () => import('./mesa/mesa.page').then((m) => m.MesaPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./splash/splash.page').then((m) => m.SplashPage),
  },
];
