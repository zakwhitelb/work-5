import {Component, OnInit} from '@angular/core';
import {NgIf, NgFor, AsyncPipe} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Customer} from "../model/Customer.model";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

    customers!: Observable<Array<Customer>>;
    errorMessage: string | undefined;
    searchFormGroup: FormGroup | undefined;

    constructor(private customerService: CustomerService,
                private formBuilder : FormBuilder,
                private router : Router) {
        // Constructor logic can go here
    }

    ngOnInit(): void {

      this.searchFormGroup = this.formBuilder.group({
        keyword: this.formBuilder.control("")
      });

      this.handleSearchCustomers();
    }

  handleSearchCustomers() {

    let keyword = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(keyword).pipe(
      // Handle the response and errors here
      catchError((error) => {
        this.errorMessage = error.message;
        return throwError(error);
      })
    );
  }

  handeleDeleteCustomer(id: number) {
      let confirm = window.confirm("Are you sure you want to delete this customer?");
    if (!confirm) return;
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.pipe(
          map(customers => customers.filter(customer => customer.id !== id))
        );
      },
    })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/admin/customer-accounts/"+customer.id,{state :customer});
  }
}
