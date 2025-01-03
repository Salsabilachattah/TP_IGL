import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { StatsComponent } from './pages/profilmedecin/components/stats/stats.component'; // Ajustez le chemin selon votre structure de fichiersv
import { provideHttpClient } from '@angular/common/http';
import { PatientService } from './services/patient.service';
import { FormsModule } from '@angular/forms'; // Import de FormsModule
import { AuthService } from './services/auth.service';
import { QrDisplayComponent } from './pages/profile-admin/component/qr-display/qr-display.component';
import { QrcodeComponent } from 'ngx-qrcode2';
@NgModule({
  declarations: [QrDisplayComponent,
    AppComponent,
    StatsComponent // Assurez-vous que le composant est déclaré ici
  ],
  imports: [QrcodeComponent,
    BrowserModule,
    FormsModule,
     // Assurez-vous que HttpClientModule est dans les imports
  ],
  providers: [AuthService,CookieService,PatientService,provideHttpClient()],
  bootstrap: [AppComponent] // Ne laissez pas vide
})
export class AppModule { }
