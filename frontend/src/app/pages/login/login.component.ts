import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <form #form="ngForm" (ngSubmit)="onSubmit()" class="auth-form">
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" name="email" [(ngModel)]="email" required />

        <label>Senha</label>
        <input type="password" name="password" [(ngModel)]="password" required />

        <button type="submit" [disabled]="form.invalid">Entrar</button>

        <p class="error">{{ error }}</p>
        <p>Não tem conta? <a routerLink="/register">Cadastre-se</a></p>
      </form>
    </div>
  `,
  styles: [
    `
      .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #f5f5f5;
      }
      .auth-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 320px;
        padding: 32px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      label {
        font-weight: 600;
        font-size: 14px;
      }
      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }
      button {
        padding: 10px;
        background: #1976d2;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.6;
      }
      .error {
        color: #d32f2f;
        font-size: 13px;
        margin: 0;
      }
      a {
        color: #1976d2;
      }
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.error = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Login error:', err);
        this.error = err.error?.message || err.error || err.statusText || 'Erro ao fazer login';
      },
    });
  }
}
