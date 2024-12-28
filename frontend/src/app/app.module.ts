import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // CommonModule is typically used in feature modules
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component'; // Correct path for TableComponent
import { profillaborantinComponent } from './pages/profillaborantin/profillaborantin.component'; // Correct path for profillaborantinComponent
import { AppRoutingModule } from './app.routes';  // Importez AppRoutingModule
import { FormComponent } from './components/form/form.component';
import { ConsultationButtonComponent } from './pages/profilmedecin/components/consultation-button/consultation-button.component';


@NgModule({
  declarations: [
     // Déclaration du composant TableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    AppComponent,
    TableComponent,
    AppRoutingModule,
    profillaborantinComponent, // Add profillaborantinComponent here
    FormComponent,
    ConsultationButtonComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }


