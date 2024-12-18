import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Importation de CommonModule
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component'; // Assurez-vous que le chemin est correct

@NgModule({
  declarations: [
    AppComponent,
    TableComponent // Déclaration du composant TableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule // Importation de CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
