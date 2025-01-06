import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Component, Input,EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  @Input() labels: string[] = [];
  @Output() formSubmit = new EventEmitter<{ [key: string]: string }>();

  formData: { [key: string]: string } = {};
  isSubmitted = false;

  resetForm() {
    this.labels.forEach((label) => {
      this.formData[label] = '';
    });
  }

  isFieldInvalid(field: string): boolean {
    return this.isSubmitted && !this.formData[field];
  }

  isFormValid(): boolean {
    return this.labels.every((label) => this.formData[label]?.trim() !== '');
  }

  createAccount() {
    this.isSubmitted = true;

    if (this.isFormValid()) {
      this.formSubmit.emit(this.formData); // Émettre les données vers le parent
      this.isSubmitted = false;
      this.resetForm();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
