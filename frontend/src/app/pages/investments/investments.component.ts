import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">Patrimônio</p>
          <h1>Investimentos</h1>
        </div>
        <button class="new-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Novo aporte</button>
      </header>

      <div class="summary-bar">
        <div class="stat"><span class="stat-label">Total investido</span><span class="stat-value">R$ 38.420,15</span></div>
        <div class="stat"><span class="stat-label">Rentabilidade</span><span class="stat-value income">+8,3%</span></div>
        <div class="stat"><span class="stat-label">Últimos 12 meses</span><span class="stat-value income">+R$ 2.940,00</span></div>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr><th>Ativo</th><th>Tipo</th><th>Valor investido</th><th>Saldo atual</th><th>Rentabilidade</th><th class="right">% da carteira</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let i of investments">
              <td><div class="asset-cell"><div class="asset-icon" [style.background]="i.bg">{{ i.icon }}</div><span class="asset-name">{{ i.name }}</span></div></td>
              <td><span class="tag">{{ i.type }}</span></td>
              <td class="muted">R$ {{ i.invested.toLocaleString('pt-BR') }}</td>
              <td class="muted">R$ {{ i.current.toLocaleString('pt-BR') }}</td>
              <td [class.income]="i.pct >= 0" [class.expense]="i.pct < 0">{{ i.pct >= 0 ? '+' : '' }}{{ i.pct }}%</td>
              <td class="right">{{ i.weight }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 28px; max-width: 1400px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .breadcrumb { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    h1 { font-size: 22px; font-weight: 500; margin: 0; }
    .new-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--brand); color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
    .new-btn:hover { opacity: 0.9; }

    .summary-bar { display: flex; gap: 40px; padding: 20px 24px; background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; margin-bottom: 24px; }
    .stat { display: flex; flex-direction: column; gap: 4px; }
    .stat-label { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; }
    .stat-value { font-size: 18px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .income { color: #34d399; }

    .card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; }
    .table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .table th { text-align: left; font-weight: 500; font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; padding: 14px 24px; }
    .table td { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.04); }
    .table tr:hover { background: rgba(255,255,255,0.02); }
    .asset-cell { display: flex; align-items: center; gap: 10px; }
    .asset-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .asset-name { font-weight: 500; }
    .tag { font-size: 11px; padding: 4px 8px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border-subtle); color: var(--muted-foreground); }
    .muted { color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; }
    .right { text-align: right; }
    .income { color: #34d399; font-family: 'JetBrains Mono', monospace; }
    .expense { color: #fb7185; font-family: 'JetBrains Mono', monospace; }
  `]
})
export class InvestmentsComponent {
  investments = [
    { icon: '🇧🇷', name: 'Tesouro Selic', type: 'Renda Fixa', invested: 15000, current: 16120, pct: 7.5, weight: 42, bg: 'rgba(52,211,153,0.15)' },
    { icon: '🏢', name: 'FIIs', type: 'Fundos Imob.', invested: 8000, current: 9120, pct: 14.0, weight: 24, bg: 'rgba(124,58,237,0.15)' },
    { icon: '📊', name: 'ETF IVVB11', type: 'Renda Variável', invested: 7000, current: 7380, pct: 5.4, weight: 19, bg: 'rgba(251,191,36,0.15)' },
    { icon: '🏛️', name: 'CDB Banco Master', type: 'Renda Fixa', invested: 5000, current: 5200, pct: 4.0, weight: 14, bg: 'rgba(56,189,248,0.15)' },
    { icon: '💎', name: 'Criptomoedas', type: 'Crypto', invested: 1000, current: 600, pct: -40.0, weight: 2, bg: 'rgba(251,113,133,0.15)' },
  ];
}
