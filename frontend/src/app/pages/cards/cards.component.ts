import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">Pagamentos</p>
          <h1>Cartões</h1>
        </div>
        <button class="new-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Novo cartão</button>
      </header>

      <div class="cards-grid">
        <div *ngFor="let c of cards" class="credit-card" [style.background]="'linear-gradient(135deg, ' + c.grad + ')'">
          <div class="card-bg-circle"></div>
          <div class="card-top">
            <span class="card-type">{{ c.type }}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          </div>
          <p class="card-number">{{ c.number }}</p>
          <div class="card-bottom">
            <div>
              <p class="card-label">Titular</p>
              <p class="card-value">{{ c.holder }}</p>
            </div>
            <div>
              <p class="card-label">Validade</p>
              <p class="card-value">{{ c.expiry }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card bills-section">
        <div class="section-header">
          <h3>Faturas do mês</h3>
          <span class="total-bills">R$ 3.245,80</span>
        </div>
        <table class="table">
          <thead>
            <tr><th>Cartão</th><th>Fatura</th><th>Vencimento</th><th class="right">Valor</th><th class="right">Status</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of bills">
              <td><span class="tag">{{ b.card }}</span></td>
              <td>{{ b.name }}</td>
              <td class="muted">{{ b.due }}</td>
              <td class="right">{{ b.value }}</td>
              <td class="right"><span class="badge" [class.paid]="b.status === 'Pago'" [class.pending]="b.status === 'Pendente'">{{ b.status }}</span></td>
            </tr>
          </tbody>
        </table>
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

    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; margin-bottom: 24px; }
    .credit-card { position: relative; overflow: hidden; height: 200px; border-radius: 14px; padding: 24px; color: white; display: flex; flex-direction: column; justify-content: space-between; }
    .card-bg-circle { position: absolute; bottom: -40px; right: -40px; width: 160px; height: 160px; border-radius: 50%; background: rgba(255,255,255,0.08); }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; position: relative; }
    .card-type { font-size: 12px; font-weight: 500; letter-spacing: 0.5px; }
    .card-number { font-size: 20px; font-family: 'JetBrains Mono', monospace; letter-spacing: 2px; position: relative; }
    .card-bottom { display: flex; gap: 32px; position: relative; }
    .card-label { font-size: 10px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.5px; }
    .card-value { font-size: 14px; font-weight: 500; margin-top: 2px; font-family: 'JetBrains Mono', monospace; }

    .card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; }
    .bills-section { padding: 20px 0; }
    .section-header { display: flex; justify-content: space-between; align-items: center; padding: 0 24px 16px; }
    h3 { margin: 0; font-size: 16px; font-weight: 500; }
    .total-bills { font-size: 16px; font-weight: 600; font-family: 'JetBrains Mono', monospace; color: #fb7185; }

    .table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .table th { text-align: left; font-weight: 500; font-size: 11px; color: var(--muted-foreground); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.5px; padding: 12px 24px; }
    .table td { padding: 14px 24px; border-top: 1px solid rgba(255,255,255,0.04); }
    .table tr:hover { background: rgba(255,255,255,0.02); }
    .tag { font-size: 11px; padding: 4px 8px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border-subtle); color: var(--muted-foreground); }
    .right { text-align: right; }
    .muted { color: var(--muted-foreground); }
    .badge { font-size: 11px; padding: 3px 10px; border-radius: 20px; }
    .badge.paid { background: rgba(52,211,153,0.15); color: #34d399; }
    .badge.pending { background: rgba(251,191,36,0.15); color: #fbbf24; }
  `]
})
export class CardsComponent {
  cards = [
    { type: 'NUBANK PLATINUM', number: '•••• •••• •••• 4821', holder: 'LUCAS SILVA', expiry: '08/28', grad: '#7c3aed, #4c1d95' },
    { type: 'ITAU UNICLASS', number: '•••• •••• •••• 1290', holder: 'LUCAS SILVA', expiry: '03/27', grad: '#ea580c, #92400e' },
    { type: 'INTER MASTER', number: '•••• •••• •••• 6605', holder: 'LUCAS SILVA', expiry: '11/26', grad: '#f97316, #be123c' },
  ];
  bills = [
    { card: 'Nubank', name: 'Fatura maio', due: '15/06', value: 'R$ 1.890,00', status: 'Pendente' },
    { card: 'Itaú', name: 'Fatura maio', due: '10/06', value: 'R$ 890,40', status: 'Pendente' },
    { card: 'Inter', name: 'Fatura maio', due: '20/06', value: 'R$ 465,40', status: 'Pendente' },
    { card: 'Nubank', name: 'Fatura abril', due: '15/05', value: 'R$ 2.120,00', status: 'Pago' },
    { card: 'Itaú', name: 'Fatura abril', due: '10/05', value: 'R$ 1.340,00', status: 'Pago' },
  ];
}
