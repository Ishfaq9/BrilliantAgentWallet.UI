import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavbarComponent } from '../mobile-navbar/mobile-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [RouterOutlet, MobileNavbarComponent, FooterComponent],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent {

}
