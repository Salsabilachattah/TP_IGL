import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { TestComponent } from './components/test/test.component';
import { ProfilmedecinComponent } from './pages/profilmedecin/profilmedecin.component';
import { OrdonnanceComponent } from './pages/profilmedecin/components/ordonnance/ordonnance.component';
import { BilansComponent } from './pages/profilmedecin/components/bilans/bilans.component';
import { DemanderadioComponent } from './pages/profilmedecin/components/demanderadio/demanderadio.component';
import { DemandebioComponent } from './pages/profilmedecin/components/demandebio/demandebio.component';
import { ResumeComponent } from './pages/profilmedecin/components/resume/resume.component';
import { AcceuilMedecinComponent } from './pages/profilmedecin/components/acceuil-medecin/acceuil-medecin.component';
import { NouvelleConsultationComponent } from './pages/profilmedecin/components/nouvelle-consultation/nouvelle-consultation.component';

export const routes: Routes = [
  {path: '', component: HomeComponent }, 
  {path:'medecin' , component: AcceuilMedecinComponent},
  {path:'testt', component: TestComponent },
  {path:'medecin/patients', component: ProfilmedecinComponent},
  {path:'medecin/consultation', component: NouvelleConsultationComponent},
  {path:'medecin/ordonnance', component: OrdonnanceComponent},
  {path:'medecin/bilans', component: BilansComponent},
  {path:'medecin/resume' , component:ResumeComponent },
  {path:'medecin/bilans/demandebio' , component: DemandebioComponent},
  {path:'medecin/bilans/demanderadio' , component: DemanderadioComponent},

  { path: 'admin' , component: ProfileAdminComponent},
  { path: '**', redirectTo: '' }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


