import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component'
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-page1',
  imports: [ButtonComponent , TableComponent],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css'
})
export class Page1Component {

}

