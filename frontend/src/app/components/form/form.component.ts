import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() labels: string[] = [];
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

  // Method to handle form submission
  createAccount() {
    this.isSubmitted = true;  

    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      alert('Form submitted successfully!');
      
      this.isSubmitted = false;
      this.resetForm(); 
    } else {
      alert('Please fill all required fields.');
    }
  }
}
