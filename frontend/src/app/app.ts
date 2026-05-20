import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <nav *ngIf="auth.isLoggedIn()">
      <div class="nav-brand">
        <a routerLink="/" class="brand">FinanceHub</a>
      </div>
      <div class="nav-links">
        <a routerLink="/categories" routerLinkActive="active">Categorias</a>
      </div>
      <button (click)="auth.logout()">Sair</button>
    </nav>
    <router-outlet />
  `,
  styles: [
    `
      nav {
        display: flex;
        align-items: center;
        padding: 0 24px;
        height: 56px;
        background: #1976d2;
        color: white;
        gap: 24px;
      }
      .brand {
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 18px;
      }
      .nav-links {
        display: flex;
        gap: 16px;
        flex: 1;
      }
      .nav-links a {
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;
        font-size: 14px;
      }
      .nav-links a.active,
      .nav-links a:hover {
        color: white;
      }
      button {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: white;
        padding: 6px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
      }
    `,
  ],
})
export class App {
  constructor(public auth: AuthService) {}
}
