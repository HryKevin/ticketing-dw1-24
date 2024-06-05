import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  authentification: AuthentificationService = inject(AuthentificationService);

  formulaire: FormGroup = this.formBuilder.group({
    email: ['a@a', [Validators.email, Validators.required]],
    password: ['root', [Validators.required]],
  });

  onConnexion() {
    if (this.formulaire.valid) {
      this.http
        .post(
          'http://backend-angular-ticket/login.php',
          this.formulaire.value
        )
        .subscribe((resultat: any) => {
          this.authentification.connexion(resultat.jwt);

          this.snackBar.open('Vous êtes connecté', undefined, {
            panelClass: 'snack-bar-valid',
            duration: 3000,
          });

          this.router.navigateByUrl('/accueil');
        });
    }
  }
}
