import produce, { Draft } from "immer";
import { Reducer } from "redux";
import { UsersActions } from "./actions";
import { UsersState } from "./model";

const initialState: UsersState = {
  ids: [],
  entities: {},
};

export const usersReducers: Reducer<UsersState, UsersActions> = produce(
  (draft: Draft<UsersState>, action: UsersActions) => {
    console.log(draft, action);
  },
  initialState
);
