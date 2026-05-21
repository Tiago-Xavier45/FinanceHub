import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
          </div>
          <h1 class="auth-title">Criar conta</h1>
          <p class="auth-sub">Comece a gerenciar suas finanças</p>
        </div>

        <form #form="ngForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="field">
            <label>Nome</label>
            <div class="input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" name="name" [(ngModel)]="name" required placeholder="Seu nome completo" />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" name="email" [(ngModel)]="email" required placeholder="seu@email.com" />
            </div>
          </div>

          <div class="field">
            <label>Senha</label>
            <div class="input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input type="password" name="password" [(ngModel)]="password" required placeholder="Mínimo 6 caracteres" />
            </div>
          </div>

          <div class="field">
            <label>Empresa</label>
            <div class="input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <input type="text" name="tenantName" [(ngModel)]="tenantName" required placeholder="Nome da sua empresa" />
            </div>
          </div>

          <button type="submit" [disabled]="form.invalid" class="submit-btn">
            Cadastrar
          </button>

          <p class="error" *ngIf="error">{{ error }}</p>

          <p class="auth-footer">
            Já tem conta? <a routerLink="/login" class="link">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: var(--deep); padding: 20px;
    }
    .auth-card {
      width: 100%; max-width: 400px;
      background: rgba(20,20,26,0.8); border: 1px solid var(--border-subtle);
      border-radius: 16px; padding: 40px 32px;
      backdrop-filter: blur(12px);
    }
    .auth-header { text-align: center; margin-bottom: 32px; }
    .logo-icon {
      width: 48px; height: 48px; border-radius: 14px;
      background: linear-gradient(135deg, var(--brand), #34d399);
      display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;
    }
    .auth-title { font-size: 24px; font-weight: 600; margin: 0 0 4px; }
    .auth-sub { font-size: 13px; color: var(--muted-foreground); margin: 0; }

    .auth-form { display: flex; flex-direction: column; gap: 20px; }
    .field { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 12px; color: var(--muted-foreground); font-weight: 500; }
    .input-wrap {
      display: flex; align-items: center; gap: 10px;
      background: var(--surface); border: 1px solid var(--border-subtle);
      border-radius: 10px; padding: 0 14px; transition: border-color 0.2s;
    }
    .input-wrap:focus-within { border-color: var(--brand); }
    .input-icon { color: var(--muted-foreground); flex-shrink: 0; }
    .input-wrap input {
      flex: 1; background: transparent; border: none; outline: none;
      color: var(--foreground); font-size: 14px; padding: 12px 0;
    }
    .input-wrap input::placeholder { color: var(--muted-foreground); opacity: 0.5; }

    .submit-btn {
      padding: 12px; background: var(--brand); color: white;
      border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
      cursor: pointer; transition: opacity 0.2s;
    }
    .submit-btn:hover { opacity: 0.9; }
    .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .error { color: #fb7185; font-size: 13px; margin: 0; text-align: center; }

    .auth-footer { text-align: center; font-size: 13px; color: var(--muted-foreground); margin: 0; }
    .link { color: var(--brand); text-decoration: none; font-weight: 500; }
    .link:hover { text-decoration: underline; }
  `]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  tenantName = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.error = '';
    this.auth
      .register({
        name: this.name,
        email: this.email,
        password: this.password,
        tenantName: this.tenantName,
      })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          console.error('Register error:', err);
          this.error = err.error?.message || err.error || err.statusText || 'Erro ao cadastrar. Verifique se o backend está rodando.';
        },
      });
  }
}
