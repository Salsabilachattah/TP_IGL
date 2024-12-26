import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bilans',
  imports: [],
  templateUrl: './bilans.component.html',
  styleUrl: './bilans.component.css'
})
export class BilansComponent {
  constructor (private router :Router){}

  redigerbilanbio(){
   this.router.navigate(['/medecin/bilans/demanderadio'])
  }

  redigerbilanradio(){
    this.router.navigate(['/medecin/bilans/demandebio'])
  }

  redigeresume(){
    this.router.navigate(['/medecin/resume'])
  }
}





