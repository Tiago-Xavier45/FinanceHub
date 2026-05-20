import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        loadComponent: () =>
          import(
            './pages/categories/category-list/category-list.component'
          ).then((m) => m.CategoryListComponent),
      },
      {
        path: 'categories/new',
        loadComponent: () =>
          import(
            './pages/categories/category-form/category-form.component'
          ).then((m) => m.CategoryFormComponent),
      },
      {
        path: 'categories/:id/edit',
        loadComponent: () =>
          import(
            './pages/categories/category-form/category-form.component'
          ).then((m) => m.CategoryFormComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
