import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { form_laboratinComponent } from '../../../profillaborantin/components/form_laboratin/form_laboratin.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BilanService } from '../../../../services/bilan.service';
import { Image, Bilan } from '../../../../models/bilan.model';
@Component({
  selector: 'app-demande-radiologue',
  imports: [MenuComponent,CommonModule,  RouterModule , form_laboratinComponent],
  templateUrl: './demande-radiologue.component.html',
  styleUrl: './demande-radiologue.component.css'
})
export class DemandeRadiologueComponent {
  activeTab: string = 'nonTreated'; // Default tab
    nonTreatedDemandes: any[] = [];
    treatedDemandes: any[] = [];
    imageUrls: string[] = []; // Array to store image URLs

    constructor(private bilanService: BilanService) {}
  
    ngOnInit(): void {
      this.fetchNonTreatedBilans();
      this.fetchTreatedBilans();
    }
  
    // Fetch non-treated bilans
    fetchNonTreatedBilans(): void {
      this.bilanService.getNonTreatedBilansradio().subscribe({
        next: (response) => {
          console.log("les reponse",response.bilans);
          this.nonTreatedDemandes = response.bilans;
        },
        error: (err) => {
          console.error('Error fetching non-treated bilans:', err);
        }
      });
    }
  
    fetchTreatedBilans(): void {
      this.bilanService.getTreatedBilansradio().subscribe({
        next: (response) => {
          console.log('Treated Bilans:', response.bilans);
          this.treatedDemandes = response.bilans.map((bilan: Bilan) => {
            // Extract file names from images
            const images = (bilan.images || []).map((image: any) => {
              const fileName = image.image.split('/').pop(); // Extract file name from the image path
              return this.bilanService.generateImageUrl(fileName); // Generate the full URL
            });
    
            return { ...bilan, images }; // Add the processed images back to the bilan
          });
        },
        error: (err) => {
          console.error('Error fetching treated bilans:', err);
        },
      });
    }

    

    setActiveTab(tab: string): void {
      this.activeTab = tab;
    }
}
