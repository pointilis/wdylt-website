import { createReducer, on } from '@ngrx/store';
import { LearnActions } from '../../actions/learn/learn.actions';
import { Statuses } from '../../../../core/constants';

export const learnFeatureKey = 'learn';

export interface LearnState {
  add: {
    data: unknown
    error: unknown
    status: string
  }
  list: {
    data: unknown[]
    error: unknown
    status: string
  },
  retrieve: {
    data: unknown
    error: unknown
    status: string
  }
}

export const initialState: LearnState = {
  add: {
    data: null,
    error: null,
    status: Statuses.IDLE,
  },
  list: {
    data: [],
    error: null,
    status: Statuses.IDLE,
  },
  retrieve: {
    data: null,
    error: null,
    status: Statuses.IDLE,
  },
};

export const LearnReducer = createReducer(
  initialState,

  // ...
  // ADD LEARN
  // ...
  on(LearnActions.addLearn, (state) => {
    return {
      ...state,
      add: {
        ...state.add,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(LearnActions.addLearnSuccess, (state, { data }) => {
    return {
      ...state,
      add: {
        ...state.add,
        data: data,
        status: Statuses.SUCCESS,
      },
      list: {
        ...state.list,
        data: [
          ...state.list.data,
          data,
        ]
      }
    }
  }),
  on(LearnActions.addLearnFailure, (state, { error }) => {
    return {
      ...state,
      add: {
        ...state.add,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // UPDATE LEARN
  // ...
  on(LearnActions.updateLearn, (state) => {
    return {
      ...state,
      add: {
        ...state.add,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(LearnActions.updateLearnSuccess, (state, { data }) => {
    return {
      ...state,
      add: {
        ...state.add,
        data: data,
        status: Statuses.SUCCESS,
      },
      list: {
        ...state.list,
        data: [
          ...state.list.data,
          data,
        ]
      }
    }
  }),
  on(LearnActions.updateLearnFailure, (state, { error }) => {
    return {
      ...state,
      add: {
        ...state.add,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // GET LEARNS
  // ...
  on(LearnActions.getLearns, (state) => {
    return {
      ...state,
      list: {
        ...state.list,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(LearnActions.getLearnsSuccess, (state, { data }) => {
    return {
      ...state,
      list: {
        ...state.list,
        data: data,
        status: Statuses.SUCCESS,
      }
    }
  }),
  on(LearnActions.getLearnsFailure, (state, { error }) => {
    return {
      ...state,
      list: {
        ...state.list,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // GET LEARN
  // ...
  on(LearnActions.getLearn, (state) => {
    return {
      ...state,
      retrieve: {
        ...state.retrieve,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(LearnActions.getLearnSuccess, (state, { data }) => {
    return {
      ...state,
      retrieve: {
        ...state.retrieve,
        data: data,
        status: Statuses.SUCCESS,
      }
    }
  }),
  on(LearnActions.getLearnFailure, (state, { error }) => {
    return {
      ...state,
      retrieve: {
        ...state.retrieve,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),
);

