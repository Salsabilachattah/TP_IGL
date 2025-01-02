
import { Component } from '@angular/core';
import { FormComponent } from '../../../../components/form/form.component';
import { InformationPersoComponent } from '../../../../components/information-perso/information-perso.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { MedecinService } from '../../../../services/medecin.service';
import { AuthService } from '../../../../services/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-info-perso',
  imports: [MenuComponent, FormComponent , InformationPersoComponent],
  templateUrl: './info-perso.component.html',
  styleUrls: ['./info-perso.component.css']
})
export class InfoPersoComponent implements OnInit {
  labels = ['Nom', 'Prénom', 'Téléphone'];
  formData: { [key: string]: string } = {
    'Nom': '',
    'Prénom': '',
    'Téléphone': '',
  };

  constructor(private authService: AuthService, private medecinService: MedecinService) {
  }

  ngOnInit() {
    this.authService.getUserInfo().subscribe(user => {
      if (user) {
        this.formData['Nom'] = user.nom ?? '';
        this.formData['Prénom'] = user.prenom ?? '';
        this.formData['Téléphone'] = user.telephone ?? '';
        console.log('User Data:', this.formData);
      }
    });
  }
}
