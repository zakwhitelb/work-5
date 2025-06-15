import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Customer, BankAccount } from "../model/Customer.model";
import { JsonPipe, NgIf, NgClass, NgFor, DecimalPipe } from "@angular/common";

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    NgFor,
    NgClass,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    // Si customer n'est pas disponible via la navigation, initialiser une structure vide
    if (!this.customer) {
      this.customer = {
        id: parseInt(this.customerId),
        name: '',
        email: '',
        bankAccounts: []
      };

      // Ici, vous pourriez appeler un service pour charger les données du client
      // this.customerService.getCustomer(this.customerId).subscribe(data => this.customer = data);
    }

    // S'assurer que bankAccounts est toujours défini
    if (!this.customer.bankAccounts) {
      this.customer.bankAccounts = [];
    }
  }
}
