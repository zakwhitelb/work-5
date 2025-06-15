import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ebanking-frontend';

  constructor(private authService: AuthService) {
    // Constructor logic here
  }

  ngOnInit(): void {
    // Initialization logic here
    this.authService.loadJwtTokenFromLocalStorage();
  }
}
