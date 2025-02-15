import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'back-button',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatIcon,
  ],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss'
})
export class BackButtonComponent {

  private location = inject(Location);

  backHandler() {
    this.location.back();
  }

}
