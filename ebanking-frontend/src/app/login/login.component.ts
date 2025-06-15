import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  // getter pour un accès facile aux champs du formulaire
  get f() { return this.loginForm.controls; }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  handleLogin() {
    this.submitted = true;
    this.errorMessage = '';

    // Arrêter ici si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: (data) => {
          this.authService.loadProfile(data);
          this.router.navigateByUrl("/admin/dashboard");
        },
        error: (err) => {
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect";
          this.loading = false;
        }
      });
  }
}
