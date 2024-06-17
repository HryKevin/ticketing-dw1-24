import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-manage-material',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './manage-material.component.html',
  styleUrl: './manage-material.component.scss',
})
export class ManageMaterialComponent {
  authentification: AuthentificationService = inject(AuthentificationService);
  html: HttpClient = inject(HttpClient);
  materialList: any = [];

  ngOnInit() {
    this.raffraichir();
  }

  raffraichir() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.html
        .get('http://backend-angular-ticket/material-list.php', {
          headers: { Authorization: jwt },
        })
        .subscribe({
          next: (result) => (this.materialList = result),
          error: () => alert('Erreur inconnue, contactez votre administrateur'),
        });
    }
  }

  onSuppressionMateriel(idMateriel: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce matériel ?')) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.html
          .delete(
            'http://backend-angular-ticket/delete-material.php?id=' +
              idMateriel,
            { headers: { Authorization: jwt } }
          )
          .subscribe({
            next: (result) => this.raffraichir(),
            error: () =>
              alert('Le matériel ne peut être supprimer si il est présent dans une réservation'),
          });
      }
    }
  }
}
