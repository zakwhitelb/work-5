import { Routes } from '@angular/router';
import {AccountsComponent} from "./accounts/accounts.component";
import {CustomersComponent} from "./customers/customers.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {authenticationGuard} from "./guards/authentication.guard";
import {authorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'accounts', component: AccountsComponent
      },
      {
        path: 'customers', component: CustomersComponent
      },
      {
        path: 'new-customer', component: NewCustomerComponent, canActivate: [authorizationGuard], data: {roles: ['ROLE_ADMIN']}
      },
      {
        path: 'customer-accounts/:id', component: CustomerAccountsComponent
      },
      {
        path: 'notAuthorized', component: NotAuthorizedComponent
      },
    ]
  },
  // Route pour gérer les urls non existantes
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
