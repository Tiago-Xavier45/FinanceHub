import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">Finanças</p>
          <h1>Transações</h1>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input placeholder="Buscar transação…" class="search-input" />
          </div>
          <button class="filter-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg> Filtros</button>
          <button class="new-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Nova transação</button>
        </div>
      </header>

      <div class="summary-bar">
        <div class="stat"><span class="stat-label">Receitas</span><span class="stat-value income">+R$ 18.200,00</span></div>
        <div class="stat"><span class="stat-label">Despesas</span><span class="stat-value expense">-R$ 12.437,00</span></div>
        <div class="stat"><span class="stat-label">Saldo do período</span><span class="stat-value">R$ 5.763,00</span></div>
      </div>

      <div class="card">
        <table class="table">
          <thead>
            <tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Tipo</th><th class="right">Valor</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of transactions">
              <td><div class="tx-cell"><div class="tx-icon">{{ t.icon }}</div><span class="tx-name">{{ t.name }}</span></div></td>
              <td><span class="tag">{{ t.cat }}</span></td>
              <td class="muted">{{ t.date }}</td>
              <td><span class="badge" [class.income]="t.pos" [class.expense]="!t.pos">{{ t.pos ? 'Receita' : 'Despesa' }}</span></td>
              <td class="right" [class.pos]="t.pos" [class.neg]="!t.pos">{{ t.amt }}</td>
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
    .header-actions { display: flex; align-items: center; gap: 10px; }
    .search-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 8px 12px; width: 220px; color: var(--muted-foreground); }
    .search-input { background: transparent; border: none; outline: none; color: var(--foreground); font-size: 13px; width: 100%; }
    .filter-btn { display: inline-flex; align-items: center; gap: 4px; padding: 8px 14px; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: 8px; color: var(--muted-foreground); font-size: 13px; cursor: pointer; }
    .filter-btn:hover { color: var(--foreground); }
    .new-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--brand); color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
    .new-btn:hover { opacity: 0.9; }

    .summary-bar { display: flex; gap: 32px; padding: 20px 24px; background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; margin-bottom: 24px; }
    .stat { display: flex; flex-direction: column; gap: 4px; }
    .stat-label { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; }
    .stat-value { font-size: 18px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .income { color: #34d399; }
    .expense { color: #fb7185; }

    .card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; }
    .table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .table th { text-align: left; font-weight: 500; font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; padding: 14px 24px; }
    .table td { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.04); }
    .table tr:hover { background: rgba(255,255,255,0.02); }
    .tx-cell { display: flex; align-items: center; gap: 10px; }
    .tx-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--surface-bright); display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .tx-name { font-weight: 500; }
    .tag { font-size: 11px; padding: 4px 8px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border-subtle); color: var(--muted-foreground); }
    .badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; }
    .badge.income { background: rgba(52,211,153,0.15); color: #34d399; }
    .badge.expense { background: rgba(251,113,133,0.15); color: #fb7185; }
    .muted { color: var(--muted-foreground); }
    .right { text-align: right; }
    .pos { color: #34d399; font-family: 'JetBrains Mono', monospace; }
    .neg { font-family: 'JetBrains Mono', monospace; }
  `]
})
export class TransactionsComponent {
  transactions = [
    { icon: '💼', name: 'Salário Maio', cat: 'Receita', date: '20/05', amt: '+R$ 6.500,00', pos: true },
    { icon: '💼', name: 'Salário Abril', cat: 'Receita', date: '22/04', amt: '+R$ 6.500,00', pos: true },
    { icon: '💰', name: 'Freelance Landing Page', cat: 'Receita', date: '15/05', amt: '+R$ 3.200,00', pos: true },
    { icon: '📈', name: 'Dividendos', cat: 'Investimento', date: '10/05', amt: '+R$ 2.000,00', pos: true },
    { icon: '🏠', name: 'Aluguel', cat: 'Moradia', date: '18/05', amt: '-R$ 1.800,00', pos: false },
    { icon: '🛒', name: 'Supermercado Pão de Açúcar', cat: 'Alimentação', date: '17/05', amt: '-R$ 432,18', pos: false },
    { icon: '🍔', name: 'iFood', cat: 'Alimentação', date: '16/05', amt: '-R$ 48,90', pos: false },
    { icon: '⛽', name: 'Posto Shell', cat: 'Transporte', date: '15/05', amt: '-R$ 210,00', pos: false },
    { icon: '🎬', name: 'Netflix', cat: 'Lazer', date: '14/05', amt: '-R$ 55,90', pos: false },
    { icon: '📈', name: 'Aporte Tesouro Direto', cat: 'Investimento', date: '12/05', amt: '-R$ 1.000,00', pos: false },
    { icon: '💊', name: 'Farmácia Droga Raia', cat: 'Saúde', date: '10/05', amt: '-R$ 89,90', pos: false },
    { icon: '🚗', name: 'Estacionamento', cat: 'Transporte', date: '08/05', amt: '-R$ 35,00', pos: false },
    { icon: '📚', name: 'Curso Online Udemy', cat: 'Educação', date: '06/05', amt: '-R$ 29,90', pos: false },
    { icon: '🎮', name: 'PS Store', cat: 'Lazer', date: '04/05', amt: '-R$ 199,00', pos: false },
    { icon: '💡', name: 'Conta de Luz', cat: 'Moradia', date: '02/05', amt: '-R$ 156,22', pos: false },
  ];
}
