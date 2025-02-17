import { createFeatureSelector, createSelector } from '@ngrx/store';
import { learnFeatureKey, LearnState } from '../../reducers/learn/learn.reducer';

export const learnSelectFeature = createFeatureSelector<LearnState>(learnFeatureKey);

export const add = createSelector(
    learnSelectFeature,
    (state: LearnState) => {
        return state.add;
    }
);

export const list = createSelector(
    learnSelectFeature,
    (state: LearnState) => {
        return state.list;
    }
);

export const retrieve = createSelector(
    learnSelectFeature,
    (state: LearnState) => {
        return state.retrieve;
    }
);