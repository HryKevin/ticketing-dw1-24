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
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  formulaireReservation: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    numero_de_serie: ['', [Validators.required]],
    debutReservation: ['', [Validators.required]],
    finReservation: ['', [Validators.required]],
  });

  materialId?: number;

  ngOnInit() {
    this.checkAuthentication(); // Vérifier l'authentification
    this.route.params.subscribe((parametres) => {
      //si il y a bien un parametre dans l'URL et que c'est bien un nombre
      if (parametres['id'] && !isNaN(parametres['id'])) {
        this.materialId = parametres['id'];

        this.formulaireReservation = this.formBuilder.group({
          nom: [{ value: '', disabled: true }, [Validators.required]],
          numero_de_serie: [
            { value: '', disabled: true },
            [Validators.required],
          ],
          debutReservation: ['', [Validators.required]],
          finReservation: ['', [Validators.required]],
        });

        const jwt = localStorage.getItem('jwt');

        if (jwt) {
          this.http
            .get(
              'http://backend-angular-ticket/get-material.php?id=' +
                parametres['id'],
              { headers: { Authorization: jwt } }
            )
            .subscribe({
              next: (material) =>
                this.formulaireReservation.patchValue(material),
              error: (erreur) => alert(erreur.error.message),
            });
        }
      } else {
        this.formulaireReservation = this.formBuilder.group({
          nom: ['', [Validators.required, Validators.email]],
          numero_de_serie: ['', [Validators.required]],
          debutReservation: ['', [Validators.required]],
          finReservation: ['', [Validators.required]],
        });
      }
    });
  }

  checkAuthentication() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.router.navigate(['/connexion']);
    }
  }

  onAjoutReservation() {
    if (this.formulaireReservation.valid) {
      const url =
        'http://backend-angular-ticket/add-reservation.php?id=' +
        this.materialId;

      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.http
          .post(url, this.formulaireReservation.value, {
            headers: { Authorization: jwt },
          })
          .subscribe({
            next: (resultat) => {
              this.snackBar.open(
                'La reservation a bien été ajouté',
                undefined,
                {
                  duration: 3000,
                }
              );
              this.router.navigateByUrl('/');
            },
            error: (erreur) => {
              if (erreur.status == 409) {
                alert(erreur.error.message);
              } else {
                alert('Erreur inconnue, contactez votre administrateur');
              }
            },
          });
      }
    }
  }
}




