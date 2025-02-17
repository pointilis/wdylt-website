import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DashboardLogoComponent } from '../../../shared/partials/dashboard-logo/dashboard-logo.component';
import { WriteCkeditorComponent } from '../../partials/write-ckeditor/write-ckeditor.component';
import { BackButtonComponent } from '../../../shared/partials/back-button/back-button.component';
import { select, Store } from '@ngrx/store';
import { LearnState } from '../../state/reducers/learn/learn.reducer';
import { LearnActions } from '../../state/actions/learn/learn.actions';
import { Observable } from 'rxjs';
import * as LearnSelectors from '../../state/selectors/learn/learn.selectors';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-write-screen',
  imports: [
    MatButtonModule,
    MatIcon,
    MatIconModule,
    DashboardLogoComponent,
    WriteCkeditorComponent,
    BackButtonComponent,
    AsyncPipe,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './write-screen.component.html',
  styleUrl: './write-screen.component.scss'
})
export class WriteScreenComponent {

  private store = inject(Store<LearnState>);
  private content: string = '';
  public add$!: Observable<{ data: any, status: string }>;

  constructor() {
    this.add$ = this.store.pipe(select(LearnSelectors.add));
  }

  onChangeEditor(event: any) {
    this.content = event;
  }

  onSave(): void {
    if (this.content && this.content != '') {
      this.store.dispatch(LearnActions.addLearn({ 
        data: {
          content: this.content,
          mimeType: 'text',
        }
       }));
    }
  }

}
