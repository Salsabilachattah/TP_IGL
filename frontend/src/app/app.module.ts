import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importation de HttpClientModule
import { AppComponent } from './app.component';
import { StatsComponent } from './pages/profilmedecin/components/stats/stats.component'; // Ajustez le chemin selon votre structure de fichiers

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent // Assurez-vous que le composant est déclaré ici
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Assurez-vous que HttpClientModule est dans les imports
  ],
  providers: [],
  bootstrap: [AppComponent] // Ne laissez pas vide
})
export class AppModule { }
