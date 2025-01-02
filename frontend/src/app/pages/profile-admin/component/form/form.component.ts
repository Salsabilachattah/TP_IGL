import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() labels: string[] = []; // Champs du formulaire
  @Output() formSubmitted = new EventEmitter<{ [key: string]: string }>(); // Événement de soumission
  formData: { [key: string]: string } = {};
  isSubmitted = false;

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.labels.forEach(label => {
      this.formData[label] = '';
    });
  }

  isFieldInvalid(field: string): boolean {
    return this.isSubmitted && !this.formData[field];
  }

  isFormValid(): boolean {
    return this.labels.every(label => this.formData[label]?.trim() !== '');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isFormValid()) {
      this.formSubmitted.emit(this.formData);
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }
}
