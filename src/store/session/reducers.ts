import { Reducer } from "redux";
import produce, { Draft } from "immer";
import { SessionActions } from "@/store/session/actions";
import { AuthUser } from "@/store/session/models";

export type SessionState = Readonly<{
  currentUser: AuthUser | null;
}>;

const initialState: SessionState = {
  currentUser: null,
};

export const sessionReducer: Reducer<SessionState, SessionActions> = produce(
  (draft: Draft<SessionState>, action: SessionActions) => {
    switch (action.type) {
      case "session/userReceived": {
        draft.currentUser = action.payload.authUser;
        break;
      }
      case "session/clear": {
        draft.currentUser = null;
        break;
      }
      default: {
        const _: never = action;
      }
    }
  },
  initialState
);
