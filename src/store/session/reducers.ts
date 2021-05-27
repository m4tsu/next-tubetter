import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import { SessionActions } from '@/store/session/actions';
import { AuthUser } from '@/store/session/models';
import { Credential } from '@/lib/firebase/config';

export type SessionState = Readonly<{
  currentUser: AuthUser | null;
  credential: Credential | null;
  isLoading: boolean;
}>;

const initialState: SessionState = {
  currentUser: null,
  credential: null,
  isLoading: true,
};

export const sessionReducer: Reducer<SessionState, SessionActions> = produce(
  (draft: Draft<SessionState>, action: SessionActions) => {
    switch (action.type) {
      case 'session/receiveUser': {
        draft.currentUser = action.payload.authUser;
        draft.isLoading = false;
        break;
      }
      case 'session/clear': {
        draft.currentUser = null;
        break;
      }
      case 'session/reveiveCredential': {
        draft.credential = action.payload.credential;
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
