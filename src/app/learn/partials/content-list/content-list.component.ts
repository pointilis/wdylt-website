import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LearnState } from '../../state/reducers/learn/learn.reducer';
import { LearnActions } from '../../state/actions/learn/learn.actions';
import * as LearnSelecttors from '../../state/selectors/learn/learn.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ContentTextComponent } from '../content-text/content-text.component';
import { ContentAudioComponent } from '../content-audio/content-audio.component';

@Component({
  selector: 'content-list',
  imports: [
    ContentTextComponent,
    ContentAudioComponent,
    AsyncPipe,
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit {

  store = inject(Store<LearnState>);
  learns$!: Observable<{ data: any, status: string }>;
  
  constructor() { 
    this.learns$ = this.store.pipe(select(LearnSelecttors.list));
  }

  ngOnInit() {
    this.store.dispatch(LearnActions.getLearns());
  }

}
