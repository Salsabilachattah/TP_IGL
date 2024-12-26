import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { profillaborantinComponent } from './pages/profillaborantin/profillaborantin.component'; // Correct path for profillaborantinComponent
import { MenuComponent } from './components/menu/menu.component';
import { TestComponent } from './components/test/test.component';
import{form_laboratinComponent} from './pages/profillaborantin/components/form_laboratin/form_laboratin.component'
import { form_radiologueComponent } from './pages/profileradiologue/components/form-radiologue/form-radiologue.component';
import { profilradiologueComponent } from './pages/profileradiologue/profileradiologue.component';
export const routes: Routes = [
  { path: 'm', component: HomeComponent }, // Route pour la page d'accueil
  {path:'testt', component: TestComponent }, 
  {path: 'test', component: MenuComponent },
  {path: 'laboratin', component: profillaborantinComponent },
  {path: 'radiologue', component: profilradiologueComponent },
  { path: 'admin' , component: ProfileAdminComponent},
  { path: 'form-radiologue' , component: form_radiologueComponent},
  { path: 'form-laboratin', component: form_laboratinComponent },
  { path: '**', redirectTo: '' }, // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
