import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../../auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ data: IUser }>(),
    'Get Current User Failure': props<{ error: unknown }>(),
  }
});
