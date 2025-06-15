import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GeneralStats {
  totalCustomers: number;
  totalAccounts: number;
  totalBalance: number;
  totalTransactions: number;
}

export interface AccountTypeDistribution {
  labels: string[];
  data: number[];
}

export interface TransactionTrend {
  labels: string[];
  data: number[];
}

export interface OperationTypeStats {
  labels: string[];
  data: number[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Données statiques pour les graphiques
  private staticAccountTypeData: AccountTypeDistribution = {
    labels: ['Compte Courant', 'Compte Épargne'],
    data: [65, 35]
  };

  private staticTransactionTrendData: TransactionTrend = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    data: [120, 150, 180, 90, 160, 200]
  };

  private staticOperationTypeData: OperationTypeStats = {
    labels: ['Débit', 'Crédit'],
    data: [45, 55]
  };

  constructor(private http: HttpClient) {}

  getGeneralStats(): Observable<GeneralStats> {
    return this.http.get<GeneralStats>(`${environment.backendHost}/api/dashboard/stats`);
  }

  getAccountTypeDistribution(): Observable<AccountTypeDistribution> {
    return of(this.staticAccountTypeData);
  }

  getTransactionTrend(): Observable<TransactionTrend> {
    return of(this.staticTransactionTrendData);
  }

  getOperationTypeStats(): Observable<OperationTypeStats> {
    return of(this.staticOperationTypeData);
  }
}
