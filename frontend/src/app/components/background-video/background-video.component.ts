import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-video',
  templateUrl: './background-video.component.html',
  styleUrls: ['./background-video.component.css'], // Facultatif si tu n'as pas de styles spécifiques
})
export class BackgroundVideoComponent {
  @Input() videoSource: string = 'assets/videos/background.mp4'; // URL par défaut
  @Input() overlayColor: string = '#356bba'; // Couleur par défaut
  @Input() overlayOpacity: number = 0.5; // Opacité par défaut
}
