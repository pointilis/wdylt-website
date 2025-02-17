import { Component, inject, ViewChild } from '@angular/core';
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
import { ContainerLayoutComponent } from '../../../shared/layouts/container-layout/container-layout.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../auth/services/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-write-screen',
  imports: [
    MatButtonModule,
    MatIcon,
    MatIconModule,
    DashboardLogoComponent,
    WriteCkeditorComponent,
    BackButtonComponent,
    ContainerLayoutComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './write-screen.component.html',
  styleUrl: './write-screen.component.scss'
})
export class WriteScreenComponent {

  @ViewChild(WriteCkeditorComponent) editor!: WriteCkeditorComponent;

  private store = inject(Store<LearnState>);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private content: string = '';
  private docId: string = this.route.snapshot.paramMap.get('docId') as string;
  public add$!: Observable<{ data: any, status: string }>;
  public retrieve$!: Observable<{ data: any, status: string }>;

  constructor() {
    this.add$ = this.store.pipe(select(LearnSelectors.add));
    this.retrieve$ = this.store.pipe(select(LearnSelectors.retrieve));
    this.retrieve$.pipe(takeUntilDestroyed()).subscribe(state => {
      if (state.status === 'success') {
        this.editor.setContent(state.data.content);
      }
    });
  }

  ngAfterViewInit() {
    if (this.docId) {
      this.getLearn(this.docId);
    }
  }

  async getLearn(docId: string) {
    const user = await this.userService.getUser();
    if (user) {
      const uid = user.uid;
      this.store.dispatch(LearnActions.getLearn({ docId: docId, uid: uid }));
    }
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

  onChangeEditor(event: any) {
    this.content = event;
  }

  onSave(): void {
    if (this.content && this.content != '') {
      if (this.docId) {
        this.updateLearn();
      } else {
        this.store.dispatch(LearnActions.addLearn({ 
          data: {
            content: this.content,
            mimeType: 'text',
          }
        }));
      }
    }
  }

}
