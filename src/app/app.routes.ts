import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ManageReservationComponent } from './manage-reservation/manage-reservation.component';
import { ManageMaterialComponent } from './manage-material/manage-material.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'ajout-utilisateur', component: EditUserComponent },
  { path: 'modifier-utilisateur/:id', component: EditUserComponent },
  { path: 'gestion-utilisateurs', component: ManageUserComponent },
  { path: 'modifier-reservation/:id', component: EditReservationComponent },
  { path: 'gestion-reservations', component: ManageReservationComponent },
  { path: 'ajout-materiel', component: EditMaterialComponent },
  { path: 'modifier-materiel/:id', component: EditMaterialComponent },
  { path: 'materiels', component: ManageMaterialComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'deconnexion', component: LogoutComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
