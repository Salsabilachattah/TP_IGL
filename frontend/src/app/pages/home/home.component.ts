import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../../services/auth.service';
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
  isConnected = false;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  // Méthode pour afficher le formulaire de connexion
  showForm() {
    this.showLoginForm = true;
  }

  ngOnInit() {
    this.authService.isConnected().subscribe({
      next: (response) => {
        this.isConnected = true;
        console.log('Session valid:', response);
      },
      error: () => {
        this.isConnected = false;
        console.log('No active session');
      },
    });
  }
  // Méthode pour soumettre le formulaire
  submitForm() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        // Vérifiez le username pour déterminer la redirection
        if (this.username === 'medecin_user') {
          this.router.navigate(['/medecin']);
        } else if (this.username === 'administratif_user') {
          this.router.navigate(['/administratif']);
        }else if (this.username === 'infirmier_user') {
          this.router.navigate(['/infirmier']);
        }else if (this.username === 'laboratorien_user') {
          this.router.navigate(['/laboratin']);
        }else if (this.username === 'patient_user_1') {
          this.router.navigate(['/patient']);
        }else if (this.username === 'patient_user_2') {
          this.router.navigate(['/patient']);
        }else if (this.username === 'pharmacien_user') {
          this.router.navigate(['/']);
        }else if (this.username === 'radiologue_user') {
          this.router.navigate(['/radiologue']);
        } else {
          this.router.navigate(['/patient']);
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        this.errorMessage = 'Échec de la connexion. Vérifiez vos informations.';
      }
    });
  }
  
}