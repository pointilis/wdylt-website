import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LearnEffects } from './learn.effects';

describe('LearnEffects', () => {
  let actions$: Observable<any>;
  let effects: LearnEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LearnEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LearnEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
