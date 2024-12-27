import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';

@Component({
  selector: 'app-home',
  standalone: true, // Assurez-vous que votre composant est standalone
  imports: [CommonModule, BackgroundVideoComponent], // Ajoutez CommonModule ici
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showLoginForm = false; // Variable pour contrôler l'affichage du formulaire
  

  // Méthode pour afficher le formulaire de connexion
  showForm() {
    this.showLoginForm = true; // Met à jour la variable pour afficher le formulaire
  }
}
