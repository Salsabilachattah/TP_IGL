import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../../components/form/form.component';
import { TableComponent } from '../../../../components/table/table.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';

// Enregistrer les composants de Chart.js
import { MenuComponent } from '../../../../components/menu/menu.component';
@Component({
  selector: 'app-form_radiologue',
  imports:[BouttonretourComponent,MenuComponent,FormComponent ,CommonModule],
  templateUrl: './form-radiologue.component.html',
  styleUrls: ['./form-radiologue.component.css']
})
export class form_radiologueComponent {
  public fields: string[] = ['Compte rendu'];

  selectedImage: string | null = null; // To store a single image preview

  // Function to trigger the hidden file input
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Function to handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files[0]) {
      const file = input.files[0];

      // Generate data URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.selectedImage = reader.result as string; // Store preview
        }
      };
      reader.readAsDataURL(file);
    }
  }
  nom: string = 'Ikram';
  prenom: string = 'Doe';
  numDossier: string = '123456';

}
