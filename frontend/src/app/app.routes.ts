import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { MenuComponent } from './pages/profile-admin/component/menu/menu.component';
import { ProfilePatientComponent } from './pages/profile-patient/profile-patient.component';
import { TestComponent } from './components/test/test.component';
export const routes: Routes = [
 // { path: '', component: HomeComponent }, // Route pour la page d'accueil
 { path: '', component:  ProfileAdminComponent},
 {path:'testt', component: TestComponent },
  {path: 'test', component: MenuComponent },

  { path: 'admin' , component: ProfileAdminComponent},
  { path: '**', redirectTo: '' }, // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
