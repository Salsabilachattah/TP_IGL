import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menu',
  imports:[RouterModule , CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 
  openCall: boolean = false;
  openProfile: boolean = false;
  user = { name: 'John Doe', ssn: '123-45-6789' };  
  usertype = 'admin';  

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
}
