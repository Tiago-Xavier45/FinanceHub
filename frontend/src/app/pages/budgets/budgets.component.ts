import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">Planejamento</p>
          <h1>Orçamentos</h1>
        </div>
        <button class="new-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Novo orçamento</button>
      </header>

      <div class="budget-grid">
        <div *ngFor="let b of budgets" class="budget-card">
          <div class="budget-top">
            <div class="budget-icon" [style.background]="b.bg">{{ b.icon }}</div>
            <div>
              <p class="budget-name">{{ b.name }}</p>
              <p class="budget-desc">Orçamento mensal</p>
            </div>
          </div>
          <div class="budget-bar">
            <div class="budget-fill" [style.width.%]="b.pct" [style.background]="b.color"></div>
          </div>
          <div class="budget-values">
            <span class="budget-spent">R$ {{ b.spent.toLocaleString('pt-BR') }}</span>
            <span class="budget-limit">de R$ {{ b.limit.toLocaleString('pt-BR') }}</span>
          </div>
          <p class="budget-remain" [class.over]="b.pct > 100">
            {{ b.pct > 100 ? 'Excedido em' : 'Restam' }}
            R$ {{ Math.abs(b.limit - b.spent).toLocaleString('pt-BR') }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 28px; max-width: 1400px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
    .breadcrumb { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    h1 { font-size: 22px; font-weight: 500; margin: 0; }
    .new-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--brand); color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
    .new-btn:hover { opacity: 0.9; }

    .budget-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .budget-card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 20px; }
    .budget-top { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .budget-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
    .budget-name { font-size: 14px; font-weight: 500; }
    .budget-desc { font-size: 11px; color: var(--muted-foreground); margin-top: 1px; }
    .budget-bar { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.06); overflow: hidden; margin-bottom: 10px; }
    .budget-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
    .budget-values { display: flex; justify-content: space-between; font-size: 13px; font-family: 'JetBrains Mono', monospace; }
    .budget-spent { font-weight: 600; }
    .budget-limit { color: var(--muted-foreground); }
    .budget-remain { font-size: 12px; color: var(--muted-foreground); margin-top: 8px; }
    .budget-remain.over { color: #fb7185; }
  `]
})
export class BudgetsComponent {
  Math = Math;
  budgets = [
    { icon: '🏠', name: 'Moradia', spent: 1956, limit: 2500, pct: 78, color: '#7c3aed', bg: 'rgba(124,58,237,0.15)' },
    { icon: '🍕', name: 'Alimentação', spent: 1480, limit: 1500, pct: 99, color: '#34d399', bg: 'rgba(52,211,153,0.15)' },
    { icon: '🚗', name: 'Transporte', spent: 420, limit: 600, pct: 70, color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
    { icon: '🎮', name: 'Lazer', spent: 750, limit: 500, pct: 150, color: '#fb7185', bg: 'rgba(251,113,133,0.15)' },
    { icon: '💊', name: 'Saúde', spent: 230, limit: 400, pct: 58, color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
    { icon: '📚', name: 'Educação', spent: 180, limit: 300, pct: 60, color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  ];
}
