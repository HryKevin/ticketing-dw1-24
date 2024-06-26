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
  selector: 'app-edit-reservation',
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
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss'],
})
export class EditReservationComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    date_debut: ['', [Validators.required]],
    date_fin: ['', [Validators.required]],
    accepte: [false, [Validators.required]],
    nom: ['', [Validators.required]],
    numero_de_serie: ['', [Validators.required]],
  });

  reservationId?: number;

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      if (parametres['id'] && !isNaN(parametres['id'])) {
        this.reservationId = parametres['id'];

        const jwt = localStorage.getItem('jwt');

        if (jwt) {
          this.http
            .get(
              'http://backend-angular-ticket/get-reservation.php?id=' +
                parametres['id'],
              { headers: { Authorization: jwt } }
            )
            .subscribe({
              next: (reservation: any) =>
                this.formulaire.patchValue({
                  email: reservation.email,
                  lastname: reservation.lastname,
                  firstname: reservation.firstname,
                  date_debut: reservation.date_debut.split('T')[0],
                  date_fin: reservation.date_fin.split('T')[0],
                  accepte: reservation.accepte,
                  nom: reservation.nom,
                  numero_de_serie: reservation.numero_de_serie,
                }),
              error: (erreur) => alert(erreur.error.message),
            });
        }
      }
    });
  }

  onModifReservation() {
    if (this.formulaire.valid) {
      const url =
        'http://backend-angular-ticket/edit-reservation.php?id=' +
        this.reservationId;

      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.http
          .post(url, this.formulaire.value, { headers: { Authorization: jwt } })
          .subscribe({
            next: (resultat) => {
              this.snackBar.open(
                "La réservation a bien été modifié",
                undefined,
                {
                  duration: 3000,
                }
              );
              this.router.navigateByUrl('/gestion-reservations');
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
