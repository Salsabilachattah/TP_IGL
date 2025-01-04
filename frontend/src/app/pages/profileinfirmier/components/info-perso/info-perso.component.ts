import { Component } from '@angular/core';
import { FormComponent } from '../../../../components/form/form.component';
import { InformationPersoComponent } from '../../../../components/information-perso/information-perso.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-info-perso',
  imports: [MenuComponent,FormComponent , InformationPersoComponent],
  templateUrl: './info-perso.component.html',
  styleUrl: './info-perso.component.css'
})
export class InfoPersoComponent {
  labels = ['Nom', 'Prénom', 'Téléphone'];
  formData: { [key: string]: string } = {
    'Nom': '',
    'Prénom': '',
    'Téléphone': ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (user) => {
        if (user) {
          // Mettre à jour formData avec les informations de l'utilisateur
          this.formData = {
            'Nom': user.nom || '',
            'Prénom': user.prenom || '',
            'Téléphone': user.telephone || ''
          };
        } else {
          console.error('L\'utilisateur n\'est pas connecté ou une erreur est survenue.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    );
  }
}