import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div class="container">
      <h2>{{ editing ? 'Editar' : 'Nova' }} Categoria</h2>
      <form #form="ngForm" (ngSubmit)="onSubmit()" class="form">
        <label>Nome</label>
        <input
          type="text"
          name="name"
          [(ngModel)]="name"
          required
          placeholder="Ex: Alimentação"
        />

        <div class="actions">
          <button type="submit" [disabled]="form.invalid" class="btn">
            {{ editing ? 'Atualizar' : 'Salvar' }}
          </button>
          <a routerLink="/categories" class="btn secondary">Cancelar</a>
        </div>

        <p class="error" *ngIf="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [
    `
      .container { padding: 24px; max-width: 480px; margin: 0 auto; }
      h2 { margin-bottom: 20px; }
      .form { display: flex; flex-direction: column; gap: 12px; }
      label { font-weight: 600; font-size: 14px; }
      input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; }
      .actions { display: flex; gap: 8px; }
      .btn { padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; text-align: center; font-size: 14px; }
      .btn:disabled { opacity: 0.6; }
      .secondary { background: #9e9e9e; }
      .error { color: #d32f2f; font-size: 13px; margin: 0; }
    `,
  ],
})
export class CategoryFormComponent implements OnInit {
  name = '';
  editing = false;
  editId: number | null = null;
  error = '';

  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.editId = Number(id);
      this.service.buscar(this.editId).subscribe({
        next: (cat) => (this.name = cat.name),
        error: () => this.router.navigate(['/categories']),
      });
    }
  }

  onSubmit() {
    this.error = '';
    const data = { name: this.name };

    const obs =
      this.editing && this.editId
        ? this.service.atualizar(this.editId, data)
        : this.service.salvar(data);

    obs.subscribe({
      next: () => this.router.navigate(['/categories']),
      error: (err) => (this.error = err.error || 'Erro ao salvar'),
    });
  }
}
