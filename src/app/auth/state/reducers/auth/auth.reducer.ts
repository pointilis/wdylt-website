import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../actions/auth/auth.actions';
import { IUser } from '../../../auth.model';
import { Statuses } from '../../../../core/constants';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: {
    data: IUser | null
    error: unknown
    status: string
  }
}

export const initialState: AuthState = {
  user: {
    data: null,
    error: null,
    status: Statuses.IDLE,
  }
};

export const AuthReducer = createReducer(
  initialState,

  // ...
  // GET CURRENT USER
  // ...
  on(AuthActions.getCurrentUser, (state) => {
    return {
      ...state,
      user: {
        ...state.user,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.getCurrentUserSuccess, (state, { data }) => {
    return {
      ...state,
      user: {
        ...state.user,
        data: data,
        error: null,
        status: Statuses.SUCCESS,
      }
    }
  }),
  on(AuthActions.getCurrentUserFailure, (state, { error }) => {
    return {
      ...state,
      user: {
        ...state.user,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // SIGNIN SUCCESS
  // ...
  on(AuthActions.signIn, (state) => {
    return {
      ...state,
      user: {
        ...state.user,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.signInSuccess, (state, { data }) => {
    return {
      ...state,
      user: {
        ...state.user,
        data: data,
        error: null,
        status: Statuses.SUCCESS,
      }
    }
  }),
  on(AuthActions.signInFailure, (state, { error }) => {
    return {
      ...state,
      user: {
        ...state.user,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // SIGNOUT
  // ...
  on(AuthActions.signOutSuccess, (state) => {
    return {
      ...state,
      user: initialState.user,
    }
  }),
  on(AuthActions.signOutFailure, (state) => {
    return {
      ...state,
      user: {
        ...state.user,
      }
    }
  }),


);

