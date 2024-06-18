import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-manage-reservation',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './manage-reservation.component.html',
  styleUrl: './manage-reservation.component.scss',
})
export class ManageReservationComponent {
  html: HttpClient = inject(HttpClient);
  reservationList: any = [];
  router: Router = inject(Router);

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      this.router.navigate(['/connexion']);
    } else {
      this.raffraichir();
    }
  }

  raffraichir() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.html
        .get('http://backend-angular-ticket/reservation-list.php', {
          headers: { Authorization: jwt },
        })
        .subscribe({
          next: (result) => (this.reservationList = result),
          error: () => alert('Erreur inconnue, contactez votre administrateur'),
        });
    }
  }

  onSuppressionReservation(idReservation: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.html
          .delete(
            'http://backend-angular-ticket/delete-reservation.php?id=' +
              idReservation,
            { headers: { Authorization: jwt } }
          )
          .subscribe({
            next: (result) => this.raffraichir(),
            error: () =>
              alert('Erreur inconnue, contactez votre administrateur'),
          });
      }
    }
  }
}
