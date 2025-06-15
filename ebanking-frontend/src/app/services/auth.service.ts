import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { jwtDecode } from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accesToken!: string;

  constructor(private http:HttpClient,
              private router : Router) { }

  public login(username: string, password: string) {
    let params = new HttpParams().set("username", username).set("password", password);
    return this.http.post(environment.backendHost+"/auth/login", params, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
  }

  loadProfile(data: any) {
    // Déboguer la structure de la réponse
    console.log("Données reçues du serveur:", data);

    // Vérifier si le token existe dans différentes propriétés possibles
    const token = data["access-token"];

    // Vérifier que le token est valide
    if (!token || typeof token !== 'string') {
      console.error("Token invalide ou manquant:", token);
      return;
    }

    try {
      // Assigner le token et marquer comme authentifié
      this.accesToken = token;
      this.isAuthenticated = true;

      // Décoder le token
      let decodedToken: any = jwtDecode(token);
      console.log("Token décodé avec succès:", decodedToken);

      // Extraire les informations du token
      this.username = decodedToken.sub;
      this.roles = decodedToken.scope || decodedToken.scopes || decodedToken.authorities || [];
      window.localStorage.setItem("jwt-token", token);
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      this.isAuthenticated = false;
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.roles = null;
    this.username = null;
    window.localStorage.removeItem("jwt-token");
    this.router.navigateByUrl("/login");
  }

  loadJwtTokenFromLocalStorage() {
    const token = window.localStorage.getItem("jwt-token");
    if (token) {
      this.loadProfile({ "access-token": token });
      // Ne pas forcer la redirection ici
    }
  }
}
