import { AsyncPipe, JsonPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import WafeSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { LearnState } from '../../state/reducers/learn/learn.reducer';
import * as LearnSelectors from '../../state/selectors/learn/learn.selectors';

export interface Duration {
  minutes: string
  seconds: string
}

@Component({
  selector: 'audio-recorder',
  imports: [
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon,
    NgIf,
    NgClass,
    NgStyle,
    MatFormField,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './audio-recorder.component.html',
  styleUrl: './audio-recorder.component.scss'
})
export class AudioRecorderComponent {

  store = inject(Store<LearnState>);
  
  @Output('onRecordEnd') 
  onRecordEnd: EventEmitter<any> = new EventEmitter<any>;

  wafesurver!: WafeSurfer;
  record!: RecordPlugin;
  scrollingWafeform: boolean = true;
  continuousWaveform: boolean = false;
  duration: WritableSignal<Duration> = signal<Duration>({ minutes: '00', seconds: '00'});
  isPaused: WritableSignal<boolean> = signal<boolean>(false);
  isRecording: WritableSignal<boolean> = signal<boolean>(false);
  content: string = '';
  uploadAudio$!: Observable<{ data: any, status: string }>;

  constructor() {
    this.uploadAudio$ = this.store.pipe(select(LearnSelectors.uploadAudio));
  }

  ngAfterViewInit() {
    this.initializeWafeSurfer();
  }

  /**
   * Initializing
   */
  initializeWafeSurfer() {
    // Destroy previous instance
    if (this.wafesurver) {
      this.wafesurver.destroy();
    }

    // Create new instance
    this.wafesurver = WafeSurfer.create({
      container: '#mic',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      height: 40,
      barHeight: 0.8,
      autoplay: true,
    });

    // Initialize record plugin
    this.record = this.wafesurver.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: false,
        scrollingWaveform: this.scrollingWafeform,
        continuousWaveform: this.continuousWaveform,
        continuousWaveformDuration: 30, // optional
      }),
    )

    // On record end
    this.record.on('record-end', (blob) => {
      console.log('recorderd data', blob);
      this.onRecordEnd.emit({ blob: blob, content: this.content });
    });

    // Record on progress
    this.record.on('record-progress', (time) => {
      this.getRealtimeDuration(time);
    });
  }

  /**
   * Get realtime duration
   */
  getRealtimeDuration(time: number) {
    const _minutes = Math.floor((time % 3600000) / 60000);
    const minutes = (_minutes < 10 ? '0' + _minutes : _minutes).toString(); // added zero
    const _seconds = Math.floor((time % 60000) / 1000);
    const seconds = (_seconds < 10 ? '0' + _seconds : _seconds).toString();

    this.duration.update((dur: Duration) => {
      return {
        minutes: minutes,
        seconds: seconds,
      }
    });
  }

  /**
   * Start record handler
   */
  onStartRecordHandler() {
    if (this.record.isRecording() || this.record.isPaused()) {
      this.record.stopRecording();
      console.log('stop')

      setTimeout(() => {
        this.duration.update((value: Duration) => {
          return {
            minutes: '00',
            seconds: '00',
          }
        });
      }, 10);

      this.isRecording.set(false);
      return;
    } 
    
    // Make sure not paused
    if (!this.record.isPaused()) {
      this.record.startRecording().then(() => {
        console.log('recording...');
        this.isRecording.set(true);
      });
    }
  }

  /**
   * Pause handler
   */
  onPauseHandler() {
    if (this.isPaused()) {
      this.record.resumeRecording();
      this.isPaused.set(false);
      return;
    }

    this.record.pauseRecording();
    this.isPaused.set(true);
  }

  /**
   * Reset
   */
  onResetHandler() {
    if (this.record.isRecording()) {
      this.record.stopRecording();

      setTimeout(() => {
        this.duration.update((value: Duration) => {
          return {
            minutes: '00',
            seconds: '00',
          }
        });
      }, 10);

      this.isRecording.set(false);
    }
  }

  /**
   * Stop and save
   */
  stopAndSave() {
    this.onStartRecordHandler();
  }

}
