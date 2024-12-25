import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilAdminComponent } from '../../components/accueil-admin/accueil-admin.component';
import { FormComponent } from '../../components/form/form.component';
import { MenuComponent } from '../../components/menu/menu.component';
@Component({
  selector: 'app-profile-admin',
  imports: [CommonModule,AccueilAdminComponent,FormComponent,MenuComponent],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent {

  fields: Array<string> = ["Nom", "Prenom","Numéro de sécurité sociale", "Date de naissance" , "Adresse" , "Numéro de téléphone","Mutuelle","Médecin traitant","Personne à contacter"]

}
