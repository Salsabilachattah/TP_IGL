import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { form_laboratinComponent } from '../../../profillaborantin/components/form_laboratin/form_laboratin.component';
import { MenuComponent } from '../../../../components/menu/menu.component';
import { BilanService } from '../../../../services/bilan.service';
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
  
    constructor(private bilanService: BilanService) {}
  
    ngOnInit(): void {
      this.fetchNonTreatedBilans();
      this.fetchTreatedBilans();
    }
  
    // Fetch non-treated bilans
    fetchNonTreatedBilans(): void {
      this.bilanService.getNonTreatedBilansradio().subscribe({
        next: (response) => {
          this.nonTreatedDemandes = response.bilans;
        },
        error: (err) => {
          console.error('Error fetching non-treated bilans:', err);
        }
      });
    }
  
    // Fetch treated bilans
    fetchTreatedBilans(): void {
      this.bilanService.getTreatedBilansradio().subscribe({
        next: (response) => {
          this.treatedDemandes = response.bilans;
        },
        error: (err) => {
          console.error('Error fetching treated bilans:', err);
        }
      });
    }
  
    setActiveTab(tab: string): void {
      this.activeTab = tab;
    }
}
