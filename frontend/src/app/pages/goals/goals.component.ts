import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">Objetivos</p>
          <h1>Metas</h1>
        </div>
        <button class="new-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg> Nova meta</button>
      </header>

      <div class="goals-grid">
        <div *ngFor="let g of goals" class="goal-card">
          <div class="goal-emoji-wrap">{{ g.emoji }}</div>
          <h3 class="goal-name">{{ g.name }}</h3>
          <div class="goal-progress">
            <div class="goal-bar">
              <div class="goal-fill" [style.width.%]="g.pct" [style.background]="g.color"></div>
            </div>
            <span class="goal-pct-text">{{ g.pct }}%</span>
          </div>
          <div class="goal-values">
            <div><span class="label">Atual</span><span class="value">R$ {{ g.curr.toLocaleString('pt-BR') }}</span></div>
            <div><span class="label">Meta</span><span class="value">R$ {{ g.goal.toLocaleString('pt-BR') }}</span></div>
          </div>
          <p class="goal-deadline" *ngIf="g.deadline">Prazo: {{ g.deadline }}</p>
          <div class="goal-actions">
            <button class="btn-outline">Editar</button>
            <button class="btn-outline primary">Adicionar valor</button>
          </div>
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

    .goals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .goal-card { background: rgba(20,20,26,0.6); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 24px; }
    .goal-emoji-wrap { font-size: 36px; margin-bottom: 12px; }
    .goal-name { font-size: 16px; font-weight: 500; margin: 0 0 16px; }
    .goal-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .goal-bar { flex: 1; height: 10px; border-radius: 5px; background: rgba(255,255,255,0.06); overflow: hidden; }
    .goal-fill { height: 100%; border-radius: 5px; transition: width 0.3s; }
    .goal-pct-text { font-size: 13px; font-family: 'JetBrains Mono', monospace; color: var(--muted-foreground); }
    .goal-values { display: flex; gap: 24px; margin-bottom: 12px; }
    .goal-values div { display: flex; flex-direction: column; gap: 2px; }
    .label { font-size: 11px; color: var(--muted-foreground); text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
    .value { font-size: 15px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .goal-deadline { font-size: 12px; color: var(--muted-foreground); margin-bottom: 16px; }
    .goal-actions { display: flex; gap: 8px; }
    .btn-outline { flex: 1; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); background: transparent; color: var(--foreground); font-size: 12px; cursor: pointer; }
    .btn-outline:hover { background: var(--surface); }
    .btn-outline.primary { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.3); color: var(--brand); }
    .btn-outline.primary:hover { background: rgba(124,58,237,0.25); }
  `]
})
export class GoalsComponent {
  goals = [
    { emoji: '🗾', name: 'Viagem ao Japão', curr: 8400, goal: 18000, pct: 47, color: 'linear-gradient(90deg, #7c3aed, #6366f1)', deadline: 'Mar 2027' },
    { emoji: '🛡️', name: 'Reserva de emergência', curr: 12500, goal: 15000, pct: 83, color: 'linear-gradient(90deg, #34d399, #14b8a6)', deadline: 'Dez 2026' },
    { emoji: '💻', name: 'MacBook Pro', curr: 4200, goal: 22000, pct: 19, color: 'linear-gradient(90deg, #fbbf24, #f97316)', deadline: 'Dez 2026' },
    { emoji: '🎓', name: 'Curso de inglês', curr: 1800, goal: 2400, pct: 75, color: 'linear-gradient(90deg, #fb7185, #e879f9)', deadline: 'Ago 2026' },
    { emoji: '🚗', name: 'Carro novo', curr: 8000, goal: 60000, pct: 13, color: 'linear-gradient(90deg, #38bdf8, #818cf8)', deadline: 'Jun 2027' },
    { emoji: '🏖️', name: 'Férias Europa', curr: 3000, goal: 25000, pct: 12, color: 'linear-gradient(90deg, #a78bfa, #c084fc)', deadline: 'Jul 2027' },
  ];
}
