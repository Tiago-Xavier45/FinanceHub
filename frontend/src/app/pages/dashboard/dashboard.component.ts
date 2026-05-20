import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <!-- Topbar -->
    <header class="topbar">
      <div>
        <p class="greeting">Olá, Lucas</p>
        <h1 class="page-title">Visão geral</h1>
      </div>
      <div class="topbar-actions">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input placeholder="Buscar transação, categoria…" class="search-input" />
        </div>
        <button class="notif-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span class="notif-dot"></span>
        </button>
        <button class="new-btn" routerLink="/categories/new">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Nova transação
        </button>
      </div>
    </header>

    <div class="content">
      <!-- KPI Cards -->
      <section class="kpi-grid">
        <div *ngFor="let c of kpis" class="kpi-card">
          <div class="kpi-glow" [style.background]="'linear-gradient(135deg, ' + c.glow + ')'"></div>
          <p class="kpi-label">{{ c.label }}</p>
          <p class="kpi-value">{{ c.value }}</p>
          <p class="kpi-delta" [class.up]="c.up" [class.down]="!c.up">
            <svg *ngIf="c.up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            <svg *ngIf="!c.up" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 7 7 7-7"/><path d="M12 5v14"/></svg>
            {{ c.delta }} vs mês anterior
          </p>
        </div>
      </section>

      <!-- Charts -->
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3>Fluxo de caixa</h3>
              <p class="chart-sub">Últimos 7 meses</p>
            </div>
            <div class="chart-legend">
              <span class="legend-item"><span class="legend-dot brand"></span> Receita</span>
              <span class="legend-item"><span class="legend-dot rose"></span> Despesa</span>
            </div>
          </div>
          <div class="bar-chart">
            <div *ngFor="let m of cashflow; let i = index" class="bar-group">
              <div class="bar-pair">
                <div class="bar bar-income" [style.height.%]="(m.income / 9000) * 100" [title]="'Receita: R$ ' + m.income.toLocaleString('pt-BR')"></div>
                <div class="bar bar-expense" [style.height.%]="(m.expense / 9000) * 100" [title]="'Despesa: R$ ' + m.expense.toLocaleString('pt-BR')"></div>
              </div>
              <span class="bar-label">{{ m.label }}</span>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3>Por categoria</h3>
              <p class="chart-sub">Mai 2026</p>
            </div>
            <button class="filter-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
              Filtrar
            </button>
          </div>

          <div class="donut-wrapper">
            <svg viewBox="0 0 180 180" class="donut">
              <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="22"/>
              <circle *ngFor="let d of donutData" cx="90" cy="90" r="70" fill="none"
                [attr.stroke]="d.color" stroke-width="22"
                [attr.stroke-dasharray]="d.len + ' ' + (439.8 - d.len)"
                [attr.stroke-dashoffset]="d.offset"
                stroke-linecap="butt" transform="rotate(-90 90 90)"/>
            </svg>
            <div class="donut-center">
              <p class="donut-label">Total</p>
              <p class="donut-total">R$ 4.370</p>
            </div>
          </div>

          <ul class="category-list">
            <li *ngFor="let c of categories" class="category-item">
              <span class="category-name">
                <span class="cat-dot" [style.background]="c.color"></span>
                {{ c.name }}
              </span>
              <span class="category-value">{{ c.val }} <span class="category-pct">· {{ c.pct }}</span></span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Transactions + Goals -->
      <div class="bottom-grid">
        <div class="section-card">
          <div class="section-header">
            <div>
              <h3>Transações recentes</h3>
              <p class="section-sub">Os últimos 7 lançamentos</p>
            </div>
            <a href="#" class="see-all">Ver todas <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></a>
          </div>
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th class="hide-mobile">Data</th>
                <th class="right">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of transactions">
                <td>
                  <div class="tx-cell">
                    <div class="tx-icon">{{ t.icon }}</div>
                    <span class="tx-name">{{ t.name }}</span>
                  </div>
                </td>
                <td><span class="tx-cat">{{ t.cat }}</span></td>
                <td class="hide-mobile muted">{{ t.date }}</td>
                <td class="right" [class.pos]="t.pos" [class.neg]="!t.pos">{{ t.amt }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section-card">
          <div class="section-header">
            <div>
              <h3>Metas ativas</h3>
              <p class="section-sub">Acompanhe seu progresso</p>
            </div>
            <button class="icon-btn brand-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </button>
          </div>
          <ul class="goals-list">
            <li *ngFor="let g of goals" class="goal-item">
              <div class="goal-header">
                <span class="goal-name"><span class="goal-emoji">{{ g.emoji }}</span> {{ g.name }}</span>
                <span class="goal-pct">{{ g.pct }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" [style.width.%]="g.pct" [style.background]="'linear-gradient(90deg, ' + g.grad + ')'"></div>
              </div>
              <div class="goal-values">
                <span class="muted">R$ {{ g.curr.toLocaleString('pt-BR') }}</span>
                <span class="muted">R$ {{ g.goal.toLocaleString('pt-BR') }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Accounts -->
      <section class="accounts-section">
        <div class="section-header">
          <div>
            <h3>Suas contas</h3>
            <p class="section-sub">Conectadas via Open Finance</p>
          </div>
          <button class="connect-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Conectar conta
          </button>
        </div>
        <div class="accounts-grid">
          <div *ngFor="let a of accounts" class="account-card" [style.background]="'linear-gradient(135deg, ' + a.grad + ')'">
            <div class="account-bg-blur"></div>
            <div class="account-top">
              <span class="account-bank-name">{{ a.bank }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            </div>
            <div class="account-bottom">
              <p class="account-num">{{ a.num }}</p>
              <p class="account-bal">{{ a.bal }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .topbar {
      position: sticky; top: 0; z-index: 10;
      background: rgba(10,10,15,0.8); backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 20px 28px;
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
    }
    .greeting { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
    .page-title { font-size: 22px; font-weight: 500; margin: 0; }
    .topbar-actions { display: flex; align-items: center; gap: 12px; }
    .search-box { display: none; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 8px 12px; width: 260px; }
    .search-icon { color: var(--muted-foreground); flex-shrink: 0; }
    .search-input { background: transparent; border: none; outline: none; color: var(--foreground); font-size: 13px; width: 100%; }
    @media (min-width: 768px) { .search-box { display: flex; } }
    .notif-btn { width: 40px; height: 40px; border-radius: 8px; background: var(--surface); border: 1px solid var(--border-subtle); color: var(--muted-foreground); display: flex; align-items: center; justify-content: center; position: relative; cursor: pointer; }
    .notif-btn:hover { background: var(--surface-bright); }
    .notif-dot { position: absolute; top: 10px; right: 10px; width: 6px; height: 6px; border-radius: 50%; background: #fb7185; }
    .new-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--brand); color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; }
    .new-btn:hover { opacity: 0.9; }

    .content { padding: 24px 28px; display: flex; flex-direction: column; gap: 24px; max-width: 1400px; }

    .kpi-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 16px; }
    @media (min-width: 768px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1280px) { .kpi-grid { grid-template-columns: repeat(4, 1fr); } }
    .kpi-card {
      position: relative; overflow: hidden;
      background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px;
      padding: 20px;
    }
    .kpi-glow { position: absolute; top: -32px; right: -32px; width: 96px; height: 96px; border-radius: 50%; opacity: 0.15; filter: blur(24px); }
    .kpi-label { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; position: relative; }
    .kpi-value { font-size: 26px; font-weight: 500; margin-top: 8px; font-family: 'JetBrains Mono', monospace; position: relative; }
    .kpi-delta { font-size: 12px; margin-top: 8px; display: inline-flex; align-items: center; gap: 4px; position: relative; }
    .kpi-delta.up { color: #34d399; }
    .kpi-delta.down { color: #fb7185; }

    .charts-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 1280px) { .charts-grid { grid-template-columns: 2fr 1fr; } }
    .chart-card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; }
    .chart-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
    .chart-sub { font-size: 12px; color: var(--muted-foreground); margin-top: 2px; }
    .chart-legend { display: flex; align-items: center; gap: 12px; }
    .legend-item { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted-foreground); }
    .legend-dot { width: 6px; height: 6px; border-radius: 50%; }
    .legend-dot.brand { background: var(--brand); }
    .legend-dot.rose { background: #fb7185; }

    .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 200px; }
    @media (min-width: 640px) { .bar-chart { gap: 24px; } }
    .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; }
    .bar-pair { flex: 1; display: flex; align-items: flex-end; gap: 4px; width: 100%; justify-content: center; }
    .bar { width: 12px; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.3s; }
    @media (min-width: 640px) { .bar { width: 16px; } }
    .bar-income { background: linear-gradient(to top, rgba(124,58,237,0.7), var(--brand)); }
    .bar-expense { background: linear-gradient(to top, rgba(251,113,133,0.5), #fb7185); }
    .bar-label { font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; }

    .filter-btn { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--muted-foreground); background: none; border: none; cursor: pointer; }
    .filter-btn:hover { color: var(--foreground); }

    .donut-wrapper { position: relative; width: 176px; height: 176px; margin: 0 auto 24px; }
    .donut { width: 100%; height: 100%; }
    .donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .donut-label { font-size: 11px; color: var(--muted-foreground); }
    .donut-total { font-size: 20px; font-weight: 500; font-family: 'JetBrains Mono', monospace; margin-top: 2px; }

    .category-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
    .category-item { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
    .category-name { display: flex; align-items: center; gap: 8px; }
    .cat-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .category-value { font-family: 'JetBrains Mono', monospace; color: var(--muted-foreground); }
    .category-pct { font-size: 11px; }

    .bottom-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
    @media (min-width: 1280px) { .bottom-grid { grid-template-columns: 2fr 1fr; } }
    .section-card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; }
    .section-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--border-subtle); }
    .section-sub { font-size: 12px; color: var(--muted-foreground); margin-top: 2px; }
    .see-all { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--brand); }
    .see-all:hover { text-decoration: underline; }
    .icon-btn { width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; }
    .brand-btn { background: rgba(124,58,237,0.15); color: var(--brand); border: 1px solid rgba(124,58,237,0.3); }
    .brand-btn:hover { background: rgba(124,58,237,0.25); }

    .transactions-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .transactions-table th { text-align: left; font-weight: 500; font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 24px; }
    .transactions-table td { padding: 14px 24px; border-top: 1px solid rgba(255,255,255,0.04); }
    .transactions-table tr:hover { background: rgba(255,255,255,0.02); }
    .tx-cell { display: flex; align-items: center; gap: 10px; }
    .tx-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--surface-bright); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .tx-name { font-weight: 500; }
    .tx-cat { font-size: 11px; padding: 4px 8px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border-subtle); color: var(--muted-foreground); }
    .hide-mobile { display: none; }
    @media (min-width: 768px) { .hide-mobile { display: table-cell; } }
    .muted { color: var(--muted-foreground); }
    .right { text-align: right; }
    .pos { color: #34d399; font-family: 'JetBrains Mono', monospace; }
    .neg { color: var(--foreground); font-family: 'JetBrains Mono', monospace; }

    .goals-list { list-style: none; padding: 20px 24px; display: flex; flex-direction: column; gap: 20px; }
    .goal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .goal-name { font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
    .goal-emoji { font-size: 16px; }
    .goal-pct { font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--muted-foreground); }
    .progress-track { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.06); overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
    .goal-values { display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; font-family: 'JetBrains Mono', monospace; }

    .accounts-section { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 20px 24px; }
    .connect-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; padding: 6px 12px; border-radius: 6px; background: transparent; border: 1px solid var(--border-subtle); color: var(--muted-foreground); cursor: pointer; }
    .connect-btn:hover { background: var(--surface); color: var(--foreground); }
    .accounts-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 20px; }
    @media (min-width: 640px) { .accounts-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .accounts-grid { grid-template-columns: repeat(4, 1fr); } }
    .account-card {
      position: relative; overflow: hidden;
      height: 160px; border-radius: 12px;
      padding: 20px; color: white;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .account-bg-blur { position: absolute; bottom: -40px; right: -40px; width: 128px; height: 128px; border-radius: 50%; background: rgba(255,255,255,0.08); }
    .account-top { display: flex; justify-content: space-between; align-items: flex-start; position: relative; }
    .account-bank-name { font-size: 14px; font-weight: 500; }
    .account-bottom { position: relative; }
    .account-num { font-size: 11px; opacity: 0.7; font-family: 'JetBrains Mono', monospace; }
    .account-bal { font-size: 18px; font-weight: 500; font-family: 'JetBrains Mono', monospace; margin-top: 4px; }
  `]
})
export class DashboardComponent implements OnInit {
  kpis = [
    { label: 'Saldo total', value: 'R$ 24.860,42', delta: '+12,4%', up: true, glow: 'from-brand to-indigo-400' },
    { label: 'Receitas (mai)', value: 'R$ 8.200,00', delta: '+3,1%', up: true, glow: 'from-emerald-400 to-teal-400' },
    { label: 'Despesas (mai)', value: 'R$ 4.370,00', delta: '-8,6%', up: false, glow: 'from-rose-400 to-orange-400' },
    { label: 'Investido', value: 'R$ 38.420,15', delta: '+5,9%', up: true, glow: 'from-amber-300 to-yellow-500' },
  ];

  cashflow = [
    { label: 'Nov', income: 5800, expense: 4200 },
    { label: 'Dez', income: 6200, expense: 5100 },
    { label: 'Jan', income: 6500, expense: 3900 },
    { label: 'Fev', income: 6500, expense: 4600 },
    { label: 'Mar', income: 7100, expense: 4100 },
    { label: 'Abr', income: 7800, expense: 4780 },
    { label: 'Mai', income: 8200, expense: 4370 },
  ];

  categories = [
    { name: 'Moradia', val: 'R$ 1.800', pct: '41%', color: '#7c3aed' },
    { name: 'Alimentação', val: 'R$ 1.240', pct: '28%', color: '#34d399' },
    { name: 'Lazer', val: 'R$ 680', pct: '16%', color: '#fbbf24' },
    { name: 'Transporte', val: 'R$ 420', pct: '10%', color: '#fb7185' },
    { name: 'Saúde', val: 'R$ 230', pct: '5%', color: '#38bdf8' },
  ];

  donutData: { color: string; len: number; offset: number }[] = [];
  private donutColors = ['#7c3aed', '#34d399', '#fbbf24', '#fb7185', '#38bdf8'];

  transactions = [
    { icon: '💼', name: 'Salário Maio', cat: 'Receita', date: '20/05', amt: '+R$ 6.500,00', pos: true },
    { icon: '🏠', name: 'Aluguel', cat: 'Moradia', date: '18/05', amt: '-R$ 1.800,00', pos: false },
    { icon: '🛒', name: 'Supermercado Pão de Açúcar', cat: 'Alimentação', date: '17/05', amt: '-R$ 432,18', pos: false },
    { icon: '🍔', name: 'iFood', cat: 'Alimentação', date: '16/05', amt: '-R$ 48,90', pos: false },
    { icon: '⛽', name: 'Posto Shell', cat: 'Transporte', date: '15/05', amt: '-R$ 210,00', pos: false },
    { icon: '🎬', name: 'Netflix', cat: 'Lazer', date: '14/05', amt: '-R$ 55,90', pos: false },
    { icon: '📈', name: 'Aporte tesouro direto', cat: 'Investimento', date: '12/05', amt: '-R$ 1.000,00', pos: false },
  ];

  goals = [
    { name: 'Viagem ao Japão', emoji: '🗾', curr: 8400, goal: 18000, pct: 47, grad: '#7c3aed, #6366f1' },
    { name: 'Reserva de emergência', emoji: '🛡️', curr: 12500, goal: 15000, pct: 83, grad: '#34d399, #14b8a6' },
    { name: 'MacBook Pro', emoji: '💻', curr: 4200, goal: 22000, pct: 19, grad: '#fbbf24, #f97316' },
    { name: 'Curso de inglês', emoji: '🎓', curr: 1800, goal: 2400, pct: 75, grad: '#fb7185, #e879f9' },
  ];

  accounts = [
    { bank: 'Nubank', num: '•••• 4821', bal: 'R$ 8.420,12', grad: '#7c3aed, #4c1d95' },
    { bank: 'Itaú', num: '•••• 1290', bal: 'R$ 12.108,30', grad: '#ea580c, #92400e' },
    { bank: 'Inter', num: '•••• 6605', bal: 'R$ 2.332,00', grad: '#f97316, #be123c' },
    { bank: 'XP Investimentos', num: '•••• 0042', bal: 'R$ 38.420,15', grad: '#3f3f46, #18181b' },
  ];

  ngOnInit() {
    const circumference = 2 * Math.PI * 70;
    let offset = 0;
    this.donutData = [41, 28, 16, 10, 5].map((val, i) => {
      const len = (val / 100) * circumference;
      const data = { color: this.donutColors[i], len, offset: -offset };
      offset += len;
      return data;
    });
  }
}
