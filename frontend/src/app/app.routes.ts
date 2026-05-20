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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./pages/transactions/transactions.component').then(
            (m) => m.TransactionsComponent,
          ),
      },
      {
        path: 'budgets',
        loadComponent: () =>
          import('./pages/budgets/budgets.component').then(
            (m) => m.BudgetsComponent,
          ),
      },
      {
        path: 'goals',
        loadComponent: () =>
          import('./pages/goals/goals.component').then(
            (m) => m.GoalsComponent,
          ),
      },
      {
        path: 'investments',
        loadComponent: () =>
          import('./pages/investments/investments.component').then(
            (m) => m.InvestmentsComponent,
          ),
      },
      {
        path: 'cards',
        loadComponent: () =>
          import('./pages/cards/cards.component').then(
            (m) => m.CardsComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (m) => m.SettingsComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/category-list/category-list.component').then(
            (m) => m.CategoryListComponent,
          ),
      },
      {
        path: 'categories/new',
        loadComponent: () =>
          import('./pages/categories/category-form/category-form.component').then(
            (m) => m.CategoryFormComponent,
          ),
      },
      {
        path: 'categories/:id/edit',
        loadComponent: () =>
          import('./pages/categories/category-form/category-form.component').then(
            (m) => m.CategoryFormComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
