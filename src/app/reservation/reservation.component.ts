import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  html: HttpClient = inject(HttpClient);
  userList: any = [];

  ngOnInit() {
    this.raffraichir();
  }

  raffraichir() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.html
        .get('http://backend-angular-ticket/user-list.php', {
          headers: { Authorization: jwt },
        })
        .subscribe({
          next: (result) => (this.userList = result),
          error: () => alert('Erreur inconnue, contactez votre administrateur'),
        });
    }
  }
}
