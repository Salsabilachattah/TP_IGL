import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume',
  imports: [FormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  constructor (private router : Router ){};
  resume :string ='';
  save(){
    //envoyer au backend
    if(this.resume !=''){
      alert("Résumé sauvegardé avec succés !"); 
      this.resume='';
      this.router.navigate(['/medecin/patients'])
    }else{
      alert("Remplissez d'abord!")
    }
  }
}
