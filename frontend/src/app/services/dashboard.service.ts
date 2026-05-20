import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Summary {
  balance: number;
  income: number;
  expense: number;
  invested: number;
}

export interface CategoryExpense {
  category: string;
  value: number;
}

export interface TransactionItem {
  id: number;
  type: 'INCOME' | 'EXPENSE';
  value: number;
  date: string;
  description: string;
  categoryName: string | null;
}

export interface GoalItem {
  id: number;
  name: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
  progress: number;
}

export interface AccountItem {
  id: number;
  name: string;
  bank: string;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/summary`);
  }

  getExpensesByCategory(): Observable<CategoryExpense[]> {
    return this.http.get<CategoryExpense[]>(`${this.apiUrl}/expenses-by-category`);
  }

  getRecentTransactions(): Observable<TransactionItem[]> {
    return this.http.get<TransactionItem[]>(`${this.apiUrl}/recent-transactions`);
  }

  getGoals(): Observable<GoalItem[]> {
    return this.http.get<GoalItem[]>(`${this.apiUrl}/goals`);
  }

  getAccounts(): Observable<AccountItem[]> {
    return this.http.get<AccountItem[]>(`${this.apiUrl}/accounts`);
  }
}
