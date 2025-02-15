import { Component } from '@angular/core';
import { DashboardLogoComponent } from '../../../shared/partials/dashboard-logo/dashboard-logo.component';
import { BackButtonComponent } from '../../../shared/partials/back-button/back-button.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AudioRecorderComponent } from '../../partials/audio-recorder/audio-recorder.component';

@Component({
  selector: 'app-record-screen',
  imports: [
    DashboardLogoComponent,
    BackButtonComponent,
    AudioRecorderComponent,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
  ],
  templateUrl: './record-screen.component.html',
  styleUrl: './record-screen.component.scss'
})
export class RecordScreenComponent {

}
