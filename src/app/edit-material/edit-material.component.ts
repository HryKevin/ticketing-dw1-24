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
  selector: 'app-edit-material',
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
  templateUrl: './edit-material.component.html',
  styleUrl: './edit-material.component.scss',
})
export class EditMaterialComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  formulaire: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    date_achat: ['', [Validators.required]],
    numero_de_serie: ['', [Validators.required]],
  });

  materialId?: number;

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && !isNaN(params['id'])) {
        this.materialId = +params['id'];

        const jwt = localStorage.getItem('jwt');

        if (jwt) {
          this.http.get<any>('http://backend-angular-ticket/get-material.php?id=' + params['id'], { headers: { Authorization: jwt } })
            .subscribe({
              next: material => {
                this.formulaire.patchValue({
                  nom: material.nom,
                  date_achat: material.date_achat.split('T')[0],
                  numero_de_serie: material.numero_de_serie,
                });
              },
              error: erreur => alert(erreur.error.message)
            });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.formulaire.valid) {
      const url = this.materialId
        ? 'http://backend-angular-ticket/edit-material.php?id=' + this.materialId
        : 'http://backend-angular-ticket/add-material.php';

      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.http.post(url, this.formulaire.value, { headers: { Authorization: jwt } })
          .subscribe({
            next: () => {
              this.snackBar.open(this.materialId ? 'Le matériel a bien été modifié' : 'Le matériel a bien été ajouté', undefined, { duration: 3000 });
              this.router.navigateByUrl('/materiels');
            },
            error: erreur => {
              if (erreur.status === 409) {
                alert(erreur.error.message);
              } else {
                alert('Erreur inconnue, contactez votre administrateur');
              }
            }
          });
      }
    }
  }
}
