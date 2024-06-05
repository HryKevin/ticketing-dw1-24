import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ManageReservationComponent } from './manage-reservation/manage-reservation.component';
import { ManageMaterialComponent } from './manage-material/manage-material.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'ajout-utilisateur', component: EditUserComponent },
  { path: 'modifier-utilisateur/:id', component: EditUserComponent },
  { path: 'gestion-utilisateurs', component: ManageUserComponent },
  { path: 'gestion-reservations', component: ManageReservationComponent },
  { path: 'materiels', component: ManageMaterialComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'connexion', component: LoginComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];