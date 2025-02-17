import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const LearnActions = createActionGroup({
  source: 'Learn',
  events: {
    'Add Learn': props<{ data: Object }>(),
    'Add Learn Success': props<{ data: any }>(),
    'Add Learn Failure': props<{ error: unknown }>(),
    
    'Get Learns': emptyProps(),
    'Get Learns Success': props<{ data: any }>(),
    'Get Learns Failure': props<{ error: unknown }>(),
  }
});
