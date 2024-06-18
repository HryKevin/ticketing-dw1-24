import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  userName: string = '';
  reservations: any[] = [];
  displayedColumns: string[] = [
    'date_demande',
    'nom',
    'numero_de_serie',
    'date_debut',
    'date_fin',
    'valide',
  ];

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
      this.http
        .get<{ name: string }>(
          'http://backend-angular-ticket/user-home-info.php',
          {
            headers: { Authorization: jwt },
          }
        )
        .subscribe({
          next: (result) => {
            this.userName = result.name;
            this.getUserReservations(jwt);
          },
          error: () =>
            alert('Erreur lors de la récupération du nom de l’utilisateur'),
        });
    }
  }

  getUserReservations(jwt: string) {
    this.http
      .get<any[]>('http://backend-angular-ticket/get-reservation-user.php', {
        headers: { Authorization: jwt },
      })
      .subscribe({
        next: (result) => {
          this.reservations = result;
        },
        error: () => alert('Erreur lors de la récupération des réservations'),
      });
  }
}
