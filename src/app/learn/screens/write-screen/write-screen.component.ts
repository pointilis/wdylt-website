import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DashboardLogoComponent } from '../../../shared/partials/dashboard-logo/dashboard-logo.component';
import { WriteCkeditorComponent } from '../../partials/write-ckeditor/write-ckeditor.component';
import { BackButtonComponent } from '../../../shared/partials/back-button/back-button.component';

@Component({
  selector: 'app-write-screen',
  imports: [
    MatButtonModule,
    MatIcon,
    MatIconModule,
    DashboardLogoComponent,
    WriteCkeditorComponent,
    BackButtonComponent,
  ],
  templateUrl: './write-screen.component.html',
  styleUrl: './write-screen.component.scss'
})
export class WriteScreenComponent {

}
