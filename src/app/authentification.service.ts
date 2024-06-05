import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  connecte: boolean = localStorage.getItem('jwt') != null;

  id: number | null = null;
  role: string | null = null;
  email: string | null = null;
  firstname: string | null = null;
  lastname: string | null = null;

  constructor() {}

  connexion(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.getInfoFromJwtLocalStorage();
  }

  deconnexion() {
    localStorage.removeItem('jwt');
    this.connecte = false;
    this.id = null;
    this.role = null;
    this.email = null;
    this.firstname = null;
    this.lastname = null;
  }

  getInfoFromJwtLocalStorage() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      this.connecte = true;

      const partiesJwt = jwt.split('.');
      const bodyBase64 = partiesJwt[1];
      const jsonBody = window.atob(bodyBase64);
      const body = JSON.parse(jsonBody);

      this.id = body.id;
      this.role = body.role;
      this.email = body.email;
      this.firstname = body.firstname;
      this.lastname = body.lastname;
    }
  }
}
