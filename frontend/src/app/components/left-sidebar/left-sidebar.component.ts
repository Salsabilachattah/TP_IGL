import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'], // Utilisez vos styles personnalisés
})
export class LeftSidebarComponent {
    @Input() isLeftSidebarCollapsed: boolean = false;
    @Input() items: Array<{ icon: string; label: string; component: string }> = []; // Accept dynamic items
    @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();
    @Output() loadDynamicComponent = new EventEmitter<string>();
  
    toggleCollapse(): void {
      this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
    }
  
    loadComponent(component: string): void {
      this.loadDynamicComponent.emit(component);
    }
  }