import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  template: `
    <ng-container *ngIf="showSidebar">
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
              <div class="avatar">{{ auth.getUserName()?.charAt(0)?.toUpperCase() || 'U' }}{{ auth.getUserName()?.split(' ')?.pop()?.charAt(0)?.toUpperCase() || '' }}</div>
              <div class="user-info">
                <p class="user-name">{{ auth.getUserName() }}</p>
                <p class="user-email">{{ auth.getUserEmail() }}</p>
              </div>
              <button class="logout-btn" title="Sair" (click)="auth.logout()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </button>
            </div>
          </div>
        </aside>

        <!-- Main -->
        <main class="main">
          <router-outlet />
        </main>
      </div>
    </ng-container>

    <ng-container *ngIf="!showSidebar">
      <router-outlet />
    </ng-container>
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

    .user-card { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 8px; }
    .user-card:hover { background: var(--surface); }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #34d399, var(--brand)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: white; flex-shrink: 0; }
    .user-info { min-width: 0; flex: 1; }
    .user-name { font-size: 13px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .user-email { font-size: 11px; color: var(--muted-foreground); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .logout-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 6px; border: none; background: transparent; color: var(--muted-foreground); cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
    .logout-btn:hover { background: rgba(251,113,133,0.15); color: #fb7185; }

    .main { flex: 1; min-width: 0; }
  `]
})
export class App implements OnInit {
  showSidebar = false;
  private authPages = ['/login', '/register'];

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.updateSidebar(this.router.url);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.updateSidebar(e.url));
  }

  private updateSidebar(url: string) {
    this.showSidebar = this.auth.isLoggedIn() && !this.authPages.some((p) => url.startsWith(p));
  }
}
