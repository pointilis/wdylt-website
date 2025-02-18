import { Component, inject, ViewChild } from '@angular/core';
import { DashboardLogoComponent } from '../../../shared/partials/dashboard-logo/dashboard-logo.component';
import { BackButtonComponent } from '../../../shared/partials/back-button/back-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AudioRecorderComponent } from '../../partials/audio-recorder/audio-recorder.component';
import { ContainerLayoutComponent } from '../../../shared/layouts/container-layout/container-layout.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { LearnState } from '../../state/reducers/learn/learn.reducer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as LearnSelectors from '../../state/selectors/learn/learn.selectors';
import { AsyncPipe, NgIf } from '@angular/common';
import { LearnActions } from '../../state/actions/learn/learn.actions';
import { UserService } from '../../../auth/services/user/user.service';
import { Timestamp } from '@angular/fire/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-record-screen',
  imports: [
    DashboardLogoComponent,
    BackButtonComponent,
    AudioRecorderComponent,
    ContainerLayoutComponent,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './record-screen.component.html',
  styleUrl: './record-screen.component.scss'
})
export class RecordScreenComponent {

  @ViewChild(AudioRecorderComponent) audioRecorder!: AudioRecorderComponent;

  private store = inject(Store<LearnState>);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private actionsSubjet$ = inject(ActionsSubject);
    
  public content: string = '';
  private fileURL: string = '';
  private docId: string = this.route.snapshot.paramMap.get('docId') as string;
  public add$!: Observable<{ data: any, status: string }>;
  public retrieve$!: Observable<{ data: any, status: string }>;

  constructor() {
    this.add$ = this.store.pipe(select(LearnSelectors.add));
    this.retrieve$ = this.store.pipe(select(LearnSelectors.retrieve));
    this.retrieve$.pipe(takeUntilDestroyed()).subscribe(state => {
      if (state.status === 'success') {
        this.content = state.data.content;
      }
    });

    // listen state
    this.actionsSubjet$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case LearnActions.uploadAudioSuccess.type:
          this.fileURL = action.data;
          this.onSave();
          break;
      }
    });
  }

  async onRecordEnd(data: any) {
    const blob = data.blob;
    this.content = data.content;
    this.store.dispatch(LearnActions.uploadAudio({ blob: blob }));
  }

  async uploadAudio(blob: Blob): Promise<string> {
    const storage = getStorage();
    const auth = getAuth();
    const timestamp = Timestamp.now().toMillis();
    const storageRef = ref(storage, `${auth.currentUser?.uid}/learns/audios/${timestamp}-audio.wav`);

    return new Promise((resolve, reject) => {
      uploadBytes(storageRef, blob).then(async (snapshot) => {
        console.log('Uploaded a blob or file!');
        const downloadURL = await getDownloadURL(snapshot.ref);
        resolve(downloadURL);
      });
    });
  }

  async updateLearn() {
    const user = await this.userService.getUser();
    if (user) {
      const uid = user.uid;
      this.store.dispatch(LearnActions.updateLearn({ 
        docId: this.docId, 
        uid: uid,
        data: {
          content: this.content,
        }
      }));
    }
  }

  onSave(): void {
    if (this.docId) {
      this.updateLearn();
    } else {
      this.store.dispatch(LearnActions.addLearn({ 
        data: {
          content: this.content,
          mimeType: 'audio',
          fileURL: this.fileURL,
        }
      }));
    }
  }

}
