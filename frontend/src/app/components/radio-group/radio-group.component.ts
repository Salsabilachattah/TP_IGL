// radio-group.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RadioGroupComponent implements OnInit {
  @Input() options: { value: string; label: string }[] = [];
  @Output() selectionChange = new EventEmitter<string>();
  selectedValue: string | null = null;

  ngOnInit() {
    if (this.options.length > 0) {
      this.selectedValue = this.options[0].value;
    }
  }

  onOptionChange(value: string) {
    this.selectedValue = value;
    this.selectionChange.emit(value);
  }
}
