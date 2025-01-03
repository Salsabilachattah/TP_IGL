import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  imports:[RouterModule , CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  openCall: boolean = false;
  openProfile: boolean = false;
  user: { nom: string; prenom: string } | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe((userInfo) => {
      if (userInfo) {
        this.user = { nom: userInfo.nom || '', prenom: userInfo.prenom || '' };
      }
    });
  }

  closeOverlays() {
    this.openCall = false;
    this.openProfile = false;
  }
  

  toggleCall() {
    this.openCall = !this.openCall;
    this.openProfile = false;
  }


  toggleProfile() {
    this.openProfile = !this.openProfile;
    this.openCall = false;
  }
  logout() {
    console.log('Déconnexion en cours...');
    this.authService.logout();
    this.router.navigate(['/']); // Redirection après déconnexion
  }
  
}
