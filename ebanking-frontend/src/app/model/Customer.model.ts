export interface Customer {
  id: number;
  name: string;
  email: string;
  bankAccounts?: BankAccount[];  // Propriété optionnelle
}

export interface BankAccount {
  id: string;
  type: string;
  balance: number;
  createdAt?: Date;
  status?: string;
}
