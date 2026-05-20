import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">Sistema</p>
          <h1>Configurações</h1>
        </div>
      </header>

      <div class="settings-grid">
        <div class="card">
          <h3>Perfil</h3>
          <div class="field">
            <label>Nome</label>
            <input value="Lucas Silva" class="input" />
          </div>
          <div class="field">
            <label>Email</label>
            <input value="lucas@finvex.com" class="input" />
          </div>
          <button class="save-btn">Salvar alterações</button>
        </div>

        <div class="card">
          <h3>Aparência</h3>
          <div class="field">
            <label>Tema</label>
            <select class="input">
              <option>Escuro</option>
              <option>Claro</option>
              <option>Sistema</option>
            </select>
          </div>
          <div class="field">
            <label>Moeda</label>
            <select class="input">
              <option>BRL (R$)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>

        <div class="card">
          <h3>Notificações</h3>
          <div class="toggle-row">
            <span>Alertas de vencimento</span>
            <label class="toggle"><input type="checkbox" checked /><span class="slider"></span></label>
          </div>
          <div class="toggle-row">
            <span>Relatórios semanais</span>
            <label class="toggle"><input type="checkbox" /><span class="slider"></span></label>
          </div>
          <div class="toggle-row">
            <span>Metas atingidas</span>
            <label class="toggle"><input type="checkbox" checked /><span class="slider"></span></label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 28px; max-width: 900px; }
    .page-header { margin-bottom: 28px; }
    .breadcrumb { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    h1 { font-size: 22px; font-weight: 500; margin: 0; }
    h3 { font-size: 15px; font-weight: 500; margin: 0 0 16px; }

    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; }
    .card:last-child { grid-column: 1 / -1; }
    .field { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 12px; color: var(--muted-foreground); }
    .input { padding: 10px 12px; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: 8px; color: var(--foreground); font-size: 13px; outline: none; }
    .input:focus { border-color: var(--brand); }
    select.input { cursor: pointer; }
    .save-btn { padding: 10px 20px; background: var(--brand); color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; margin-top: 8px; }
    .save-btn:hover { opacity: 0.9; }

    .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
    .toggle-row:last-child { border-bottom: none; }
    .toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; inset: 0; background: var(--surface-bright); border-radius: 22px; transition: 0.2s; }
    .slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 3px; bottom: 3px; background: var(--muted-foreground); border-radius: 50%; transition: 0.2s; }
    .toggle input:checked + .slider { background: var(--brand); }
    .toggle input:checked + .slider::before { transform: translateX(18px); background: white; }
  `]
})
export class SettingsComponent {}
