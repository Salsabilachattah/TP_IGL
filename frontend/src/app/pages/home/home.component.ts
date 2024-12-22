import { Component } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
@Component({
  selector: 'app-home',
  imports: [BackgroundVideoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  onLearnMore(): void {
    console.log('En savoir plus sur l\'application');
    // Ajoute ici une navigation ou une logique
  }

  onContactUs(): void {
    console.log('Contactez-nous bouton cliqué');
    // Ajoute ici une redirection ou une logique de contact
  }
}
