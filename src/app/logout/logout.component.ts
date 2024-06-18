import { Component, OnInit, inject } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {
  authentification: AuthentificationService = inject(AuthentificationService);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    
    this.authentification.deconnexion();
    this.snackBar.open('Vous êtes déconnecté', undefined, {
      panelClass: 'snack-bar-valid',
      duration: 3000,
    });

    setTimeout(() => {
      this.router.navigate(['/connexion']); // Redirige l'utilisateur vers la page de connexion après 3 secondes
    });
  }
  
}
