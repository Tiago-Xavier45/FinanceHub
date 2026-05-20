import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <ng-container *ngIf="auth.isLoggedIn(); else authPages">
      <div class="layout">
        <!-- Sidebar -->
        <aside class="sidebar">
          <a routerLink="/dashboard" class="logo">
            <div class="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <span class="logo-text">FinanceHub</span>
          </a>

          <nav class="nav">
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3"/><rect width="7" height="5" x="14" y="3"/><rect width="7" height="9" x="14" y="12"/><rect width="7" height="5" x="3" y="16"/></svg>
              Visão geral
            </a>
            <a routerLink="/transactions" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              Transações
            </a>
            <a routerLink="/budgets" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              Orçamentos
            </a>
            <a routerLink="/goals" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 4 4-6"/></svg>
              Metas
            </a>
            <a routerLink="/investments" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              Investimentos
            </a>
            <a routerLink="/cards" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              Cartões
            </a>
          </nav>

          <div class="sidebar-footer">
            <a routerLink="/settings" routerLinkActive="active" class="nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              Configurações
            </a>

            <div class="premium-card">
              <p class="premium-label">Premium</p>
              <p class="premium-desc">Desbloqueie relatórios com IA</p>
              <button class="premium-btn">Fazer upgrade</button>
            </div>

            <div class="user-card">
              <div class="avatar">LS</div>
              <div class="user-info">
                <p class="user-name">Lucas Silva</p>
                <p class="user-email">lucas&#64;finvex.com</p>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main -->
        <main class="main">
          <router-outlet />
        </main>
      </div>
    </ng-container>

    <ng-template #authPages>
      <router-outlet />
    </ng-template>
  `,
  styles: [`
    .layout { display: flex; min-height: 100vh; }

    .sidebar {
      width: 240px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border-subtle);
      background: rgba(20,20,26,0.4);
      padding: 16px;
      position: sticky;
      top: 0;
      height: 100vh;
    }

    .logo { display: flex; align-items: center; gap: 10px; padding: 12px 12px 20px; }
    .logo-icon { width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, var(--brand), #34d399); display: flex; align-items: center; justify-content: center; }
    .logo-text { font-size: 18px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }

    .nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
    .nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 12px; border-radius: 8px;
      font-size: 14px; color: var(--muted-foreground);
      transition: all 0.15s;
    }
    .nav-item:hover { background: var(--surface); color: var(--foreground); }
    .nav-item.active { background: rgba(124,58,237,0.15); color: var(--foreground); outline: 1px solid rgba(124,58,237,0.3); }

    .sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 8px; }

    .premium-card {
      padding: 16px; border-radius: 12px;
      background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(52,211,153,0.1));
      outline: 1px solid rgba(124,58,237,0.2);
    }
    .premium-label { font-size: 11px; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; color: var(--brand); margin-bottom: 4px; }
    .premium-desc { font-size: 13px; margin-bottom: 12px; }
    .premium-btn { width: 100%; background: var(--brand); color: white; border: none; padding: 8px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; }
    .premium-btn:hover { opacity: 0.9; }

    .user-card { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; cursor: pointer; }
    .user-card:hover { background: var(--surface); }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #34d399, var(--brand)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: white; flex-shrink: 0; }
    .user-info { min-width: 0; }
    .user-name { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .user-email { font-size: 11px; color: var(--muted-foreground); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    .main { flex: 1; min-width: 0; }
  `]
})
export class App {
  constructor(public auth: AuthService) {}
}
