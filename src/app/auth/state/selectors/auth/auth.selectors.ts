import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../../reducers/auth/auth.reducer';

export const authSelectFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const user = createSelector(
    authSelectFeature,
    (state: AuthState) => {
        return state.user;
    }
);