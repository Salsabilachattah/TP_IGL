import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { TestComponent } from './components/test/test.component';
import { ProfilmedecinComponent } from './pages/profilmedecin/profilmedecin.component';
export const routes: Routes = [
  { path: '', component: HomeComponent }, // Route pour la page d'accueil
  {path:'testt', component: TestComponent },
  {path: 'test', component: ProfilmedecinComponent },

  { path: 'admin' , component: ProfileAdminComponent},
  { path: '**', redirectTo: '' }, // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
