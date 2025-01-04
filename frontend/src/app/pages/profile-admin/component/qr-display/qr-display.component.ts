import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-qr-display',
  standalone:true,
  imports:[CommonModule],
  template: `
    <div class="qr-container" *ngIf="imageUrl">
      <h2>QR Code Généré :</h2>
      <img [src]="imageUrl" alt="QR Code généré" />
    </div>
  `,
  styles: [`
    .qr-container {
      text-align: center;
      margin-top: 20px;
    }
    img {
      max-width: 100%;
      height: auto;
      border: 2px solid #356bba;
      border-radius: 8px;
    }
  `]
})
export class QrDisplayComponent {
  @Input() imageUrl!: string; // Propriété pour recevoir l'URL de l'image
 
}
