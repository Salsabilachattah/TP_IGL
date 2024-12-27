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
import { ProfilmedecinComponent } from './pages/profilmedecin/profilmedecin.component';
import { ProfileinfirmierComponent } from './pages/profileinfirmier/profileinfirmier.component';
import { NouvelleConsultationComponent } from './pages/profilmedecin/components/nouvelle-consultation/nouvelle-consultation.component';
import { OrdonnanceComponent } from './pages/profilmedecin/components/ordonnance/ordonnance.component';
import { BilansComponent } from './pages/profilmedecin/components/bilans/bilans.component';
import { ResumeComponent } from './pages/profilmedecin/components/resume/resume.component';
import { DemandebioComponent } from './pages/profilmedecin/components/demandebio/demandebio.component';
import { DemanderadioComponent } from './pages/profilmedecin/components/demanderadio/demanderadio.component';
import { SoinsComponent } from './pages/profileinfirmier/components/soins/soins.component';
 import { SoinsGComponent } from './pages/profileinfirmier/components/soins-g/soins-g.component';
export const routes: Routes = [
  //{ path: '', component: HomeComponent }, // Route pour la page d'accueil
  { path: '', component: ProfileinfirmierComponent  },
  { path: 'infirmier', component: ProfileinfirmierComponent },
  { path: 'medecin', component:ProfilmedecinComponent  },
  {path:'testt', component: TestComponent }, 
  {path: 'test', component: MenuComponent },
  {path: 'laboratin', component: profillaborantinComponent },
  {path: 'radiologue', component: profilradiologueComponent },
   { path: 'form-radiologue' , component: form_radiologueComponent},
  { path: 'form-laboratin', component: form_laboratinComponent },
  { path: '**', redirectTo: '' }, // Redirection pour les routes non trouvées


  {path:'medecin/patients', component: ProfilmedecinComponent},
  {path:'medecin/consultation', component: NouvelleConsultationComponent},
  {path:'medecin/ordonnance', component: OrdonnanceComponent},
  {path:'medecin/bilans', component: BilansComponent},
  {path:'medecin/resume' , component:ResumeComponent },
  {path:'medecin/bilans/demandebio' , component: DemandebioComponent},
  {path:'medecin/bilans/demanderadio' , component: DemanderadioComponent},


  {path:'infirmier/patients' , component:ProfileinfirmierComponent},
  {path:'infirmier/soins' , component:SoinsGComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
