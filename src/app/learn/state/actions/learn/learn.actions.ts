import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFilter } from '../../../learn.model';

export const LearnActions = createActionGroup({
  source: 'Learn',
  events: {
    'Add Learn': props<{ data: Object }>(),
    'Add Learn Success': props<{ data: any }>(),
    'Add Learn Failure': props<{ error: unknown }>(),
    
    'Get Learns': props<{ filter: IFilter }>(),
    'Get Learns Success': props<{ data: any, filter: IFilter }>(),
    'Get Learns Failure': props<{ error: unknown, filter: IFilter }>(),
  }
});
