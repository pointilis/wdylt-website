import { Component } from '@angular/core';
import { DashboardLogoComponent } from '../../../shared/partials/dashboard-logo/dashboard-logo.component';
import { BackButtonComponent } from '../../../shared/partials/back-button/back-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AudioRecorderComponent } from '../../partials/audio-recorder/audio-recorder.component';
import { ContainerLayoutComponent } from '../../../shared/layouts/container-layout/container-layout.component';

@Component({
  selector: 'app-record-screen',
  imports: [
    DashboardLogoComponent,
    BackButtonComponent,
    AudioRecorderComponent,
    ContainerLayoutComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './record-screen.component.html',
  styleUrl: './record-screen.component.scss'
})
export class RecordScreenComponent {

}
