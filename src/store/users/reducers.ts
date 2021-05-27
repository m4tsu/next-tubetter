import produce, { Draft } from 'immer';
import merge from 'lodash/merge';
import { Reducer } from 'redux';
import { EntitiesActions } from '../store';
import { UsersActions } from './actions';
import { NormalizedUsers, UsersState } from './model';

const initialState: UsersState = {
  ids: [],
};

export const userEntitiesReducer: Reducer<NormalizedUsers, EntitiesActions> = (
  state = {},
  action
) => {
  switch (action.type) {
    default: {
      if (action.payload?.entities?.users) {
        return merge({}, state, action.payload.entities.users);
      }
      return state;
    }
  }
};

export const usersReducers: Reducer<UsersState, UsersActions> = produce(
  (draft: Draft<UsersState>, action: UsersActions) => {
    switch (action.type) {
      case 'users/received': {
        draft.ids = action.payload.ids;
        break;
      }
      case 'dummy': {
        console.log('dummy', draft);
        break;
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = action;
      }
    }
  },
  initialState
);
