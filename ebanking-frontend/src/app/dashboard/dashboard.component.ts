import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, GeneralStats, AccountTypeDistribution, TransactionTrend, OperationTypeStats } from '../services/dashboard.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Statistiques générales
  totalCustomers: number = 0;
  totalAccounts: number = 0;
  totalBalance: number = 0;
  totalTransactions: number = 0;

  // Données pour les graphiques
  accountTypeData: AccountTypeDistribution | null = null;
  transactionTrendData: TransactionTrend | null = null;
  operationTypeData: OperationTypeStats | null = null;

  // Références aux graphiques
  private accountTypeChart: Chart | null = null;
  private transactionTrendChart: Chart | null = null;
  private operationTypeChart: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Charger les statistiques générales
    this.dashboardService.getGeneralStats().subscribe({
      next: (data: GeneralStats) => {
        this.totalCustomers = data.totalCustomers;
        this.totalAccounts = data.totalAccounts;
        this.totalBalance = data.totalBalance;
        this.totalTransactions = data.totalTransactions;
      },
      error: (err: any) => console.error('Error loading general stats:', err)
    });

    // Charger les données pour les graphiques
    this.dashboardService.getAccountTypeDistribution().subscribe({
      next: (data: AccountTypeDistribution) => {
        this.accountTypeData = data;
        this.createAccountTypeChart();
      },
      error: (err: any) => console.error('Error loading account type distribution:', err)
    });

    this.dashboardService.getTransactionTrend().subscribe({
      next: (data: TransactionTrend) => {
        this.transactionTrendData = data;
        this.createTransactionTrendChart();
      },
      error: (err: any) => console.error('Error loading transaction trend:', err)
    });

    this.dashboardService.getOperationTypeStats().subscribe({
      next: (data: OperationTypeStats) => {
        this.operationTypeData = data;
        this.createOperationTypeChart();
      },
      error: (err: any) => console.error('Error loading operation type stats:', err)
    });
  }

  private createAccountTypeChart(): void {
    const ctx = document.getElementById('accountTypeChart') as HTMLCanvasElement;
    if (ctx && this.accountTypeData) {
      this.accountTypeChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.accountTypeData.labels,
          datasets: [{
            data: this.accountTypeData.data,
            backgroundColor: ['#4e73df', '#1cc88a']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }

  private createTransactionTrendChart(): void {
    const ctx = document.getElementById('transactionTrendChart') as HTMLCanvasElement;
    if (ctx && this.transactionTrendData) {
      this.transactionTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.transactionTrendData.labels,
          datasets: [{
            label: 'Transactions',
            data: this.transactionTrendData.data,
            borderColor: '#4e73df',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  private createOperationTypeChart(): void {
    const ctx = document.getElementById('operationTypeChart') as HTMLCanvasElement;
    if (ctx && this.operationTypeData) {
      this.operationTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.operationTypeData.labels,
          datasets: [{
            data: this.operationTypeData.data,
            backgroundColor: ['#e74a3b', '#1cc88a']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }
}
