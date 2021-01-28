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
    switch (action.type) {
      case "users/received": {
        draft.ids = action.payload.ids;
        draft.entities = action.payload.users;
        break;
      }
      case "dummy": {
        console.log("dummy", draft);
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
