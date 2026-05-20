import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <div class="container">
      <div class="header">
        <h2>Categorias</h2>
        <a routerLink="/categories/new" class="btn">Nova Categoria</a>
      </div>

      <table *ngIf="categories.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cat of categories">
            <td>{{ cat.id }}</td>
            <td>{{ cat.name }}</td>
            <td>
              <a [routerLink]="['/categories', cat.id, 'edit']" class="btn-sm">Editar</a>
              <button class="btn-sm danger" (click)="deletar(cat.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="categories.length === 0">Nenhuma categoria encontrada.</p>
    </div>
  `,
  styles: [
    `
      .container { padding: 24px; max-width: 800px; margin: 0 auto; }
      .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
      h2 { margin: 0; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #ddd; }
      th { background: #f5f5f5; font-weight: 600; }
      .btn { padding: 8px 16px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; }
      .btn-sm { padding: 4px 12px; background: #1976d2; color: white; text-decoration: none; border-radius: 4px; font-size: 13px; border: none; cursor: pointer; margin-right: 4px; }
      .danger { background: #d32f2f; }
    `,
  ],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.service.listar().subscribe((data) => (this.categories = data));
  }

  deletar(id: number) {
    if (confirm('Excluir esta categoria?')) {
      this.service.deletar(id).subscribe(() => {
        this.categories = this.categories.filter((c) => c.id !== id);
      });
    }
  }
}
