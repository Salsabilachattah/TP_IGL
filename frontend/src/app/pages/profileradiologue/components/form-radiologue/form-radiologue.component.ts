import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { TableComponent } from '../../../../components/table/table.component';
import { BouttonretourComponent } from '../../../../components/bouttonretour/bouttonretour.component';
import { BilanService } from '../../../../services/bilan.service';
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
  today: Date = new Date();


  bilan: any; // Stockage du bilan unique
nss: string | null = null;
valide: boolean = false; // Par défaut, non traité

constructor(
  private route: ActivatedRoute,
  private bilanService: BilanService,
  private authService: AuthService
) {}

ngOnInit(): void {
  // Récupérer les paramètres de l'URL
  this.route.queryParams.subscribe((params) => {
    this.nss = params['id']; // Correspond au `nss`
    const valideParam = params['valide']; // Récupérer la contrainte valide
    this.valide = valideParam === 'true'; // Convertir en boolean

    if (this.nss) {
      this.loadBilan();
    }
  });
}

// Charger le bilan pour le patient donné
loadBilan(): void {
  this.bilanService.getBilanByNssAndValideradio(this.nss as string, this.valide).subscribe(
    (response) => {
      this.bilan = response.bilans[0]; // L'API retourne un tableau, mais il n'y aura qu'un élément
         // Vérification de la présence de consultation
         if (!this.bilan || !this.bilan.consultation) {
          console.error('Erreur : Consultation est manquante dans la réponse');
        } else {
          console.log('Consultation ID :', this.bilan.consultation.id);
        }
    },
    
    (error) => {
      console.error('Erreur lors du chargement du bilan :', error);
    }
  );
}





onFormSubmit(formData: { [key: string]: string }): void {
  // Mettre à jour les données du bilan localement
  console.log('Consultation:', this.bilan.consultation);  // Affiche toute la consultation
  console.log('bilan:', this.bilan);  // Affiche toute la consultation

  // Mettre à jour le compte rendu et la validité
  this.bilan.compte_rendu = formData['Compte rendu'] || '';
  this.bilan.valide = true; // Marquer comme traité

  // Mettre à jour la date de fin avec la date actuelle
  this.bilan.date_fin = new Date().toISOString(); // La date actuelle (au format ISO 8601)

  // Envoyer les données mises à jour au serveur en utilisant l'ID du bilan
  this.bilanService.updateBilanradio(this.bilan.consultation, this.bilan).subscribe(
    (response) => {
      console.log('Bilan mis à jour avec succès:', response);
      alert('Les informations ont été enregistrées avec succès.');
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du bilan:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  );
}


selectedImage: string | ArrayBuffer | null = null;
  fileToUpload: File | null = null;
  bilanId: number = 123;  // The ID of the bilan (you can get it dynamically)


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
  
      // Generate data URL for preview (optional step for image preview)
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.selectedImage = reader.result as string; // Store preview in selectedImage
        }
      };
      reader.readAsDataURL(file);
      
      // Call function to upload image (passing file to backend)
      this.uploadImage(file);
    }
  }

  // Function to upload the image to the server
  uploadImage(file: File): void {
    if (file) {
      // Prepare FormData for the image file upload
      const formData = new FormData();
      formData.append('image', file); // Append the selected image file to the FormData
      
      // Call the backend service to upload the image
      this.bilanService.uploadImage(this.bilan.consultation, formData).subscribe(
        (response) => {
          console.log('Image uploaded successfully:', response);
          alert('Image uploaded successfully!');
        },
        (error) => {
          console.error('Image upload failed:', error);
          alert('Image upload failed!');
        }
      );
    } else {
      console.warn('No image selected!');
      alert('Please select an image first!');
    }
  }
  
}
