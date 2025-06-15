import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(public authService : AuthService,
              private router : Router) {
  }
  ngOnInit(): void {
    // Initialization logic here
  }

  handleLogout() {
    this.authService.logout();
  }
}
