import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFilter } from '../../../learn.model';

export const LearnActions = createActionGroup({
  source: 'Learn',
  events: {
    'Add Learn': props<{ data: Object }>(),
    'Add Learn Success': props<{ data: any }>(),
    'Add Learn Failure': props<{ error: unknown }>(),

    'Update Learn': props<{ docId: string, uid: string, data: Object }>(),
    'Update Learn Success': props<{ data: any }>(),
    'Update Learn Failure': props<{ error: unknown }>(),

    'Delete Learn': props<{ docId: string, uid: string }>(),
    'Delete Learn Success': props<{ data: any }>(),
    'Delete Learn Failure': props<{ error: unknown }>(),
    
    'Get Learns': props<{ filter: IFilter }>(),
    'Get Learns Success': props<{ data: any, filter: IFilter }>(),
    'Get Learns Failure': props<{ error: unknown, filter: IFilter }>(),

    'Get Learn': props<{ docId: string, uid: string }>(),
    'Get Learn Success': props<{ data: any }>(),
    'Get Learn Failure': props<{ error: unknown }>(),

    'Upload Audio': props<{ blob: Blob }>(),
    'Upload Audio Success': props<{ data: any }>(),
    'Upload Audio Failure': props<{ error: unknown }>(),
  }
});
