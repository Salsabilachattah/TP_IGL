import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page1Component } from './components/page1/page1.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Page1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'myapp';
}
