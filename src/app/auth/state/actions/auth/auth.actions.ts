import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../../auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ data: IUser }>(),
    'Get Current User Failure': props<{ error: unknown }>(),

    'Sign In': emptyProps(),
    'Sign In Success': props<{ data: IUser }>(),
    'Sign In Failure': props<{ error: unknown }>(),

    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': emptyProps(),
  }
});
