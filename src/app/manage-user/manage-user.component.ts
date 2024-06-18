import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss',
})
export class ManageUserComponent {
  html: HttpClient = inject(HttpClient);
  userList: any = [];
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
        .get('http://backend-angular-ticket/user-list.php', {
          headers: { Authorization: jwt },
        })
        .subscribe({
          next: (result) => (this.userList = result),
          error: () => alert('Erreur inconnue, contactez votre administrateur'),
        });
    }
  }

  onSuppressionUtilisateur(idUtilisateur: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.html
          .delete(
            'http://backend-angular-ticket/delete-user.php?id=' + idUtilisateur,
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
