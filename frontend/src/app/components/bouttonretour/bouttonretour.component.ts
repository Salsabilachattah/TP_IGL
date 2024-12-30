import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bouttonretour',
  templateUrl: './bouttonretour.component.html',
  styleUrls: ['./bouttonretour.component.css'],
})
export class BouttonretourComponent {
  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back(); 
    //  this.router.navigate(['/infirmier']); // Remplacez "/infirmier" par votre route par défaut
    
  }
}
