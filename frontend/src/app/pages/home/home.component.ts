import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,BackgroundVideoComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showLoginForm = false; // Variable pour contrôler l'affichage du formulaire
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour afficher le formulaire de connexion
  showForm() {
    this.showLoginForm = true;
  }

  // Méthode pour soumettre le formulaire
  submitForm() {
    const loginData = { username: this.username, password: this.password };
    this.http.post('http://localhost:8000/api/login/', loginData).subscribe({
      next: (response: any) => {
        
        console.log('Connexion réussie', response);
          // Vérifiez le username pour déterminer la redirection
          if (this.username === 'medecin_user') { // Remplacez par le nom d'utilisateur du médecin
            this.router.navigate(['/medecin']);
          } else if (this.username === 'infirmierUsername') { // Remplacez par le nom d'utilisateur de l'infirmier
            this.router.navigate(['/infirmier']);
          } else {
            this.router.navigate(['/default']); // Redirection par défaut
          }
      },
      error: (error) => {
       
        console.log('Réponse du serveur :', error);
        console.error('Erreur de connexion', error);
        this.errorMessage = 'Échec de la connexion. Vérifiez vos informations.';
      }
    });
  }
}
