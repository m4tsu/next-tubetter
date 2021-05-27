import { AuthUser } from '@/store/session/models';
import firebase from 'firebase/app';

export const receiveUser = (authUser: AuthUser | null) => ({
  type: 'session/receiveUser' as const,
  payload: { authUser },
});

export const clearSession = () => ({
  type: 'session/clear' as const,
});

export const receiveCredential = (
  credential: firebase.auth.UserCredential
) => ({
  type: 'session/reveiveCredential' as const,
  payload: { credential },
});

export type SessionActions = ReturnType<
  typeof receiveUser | typeof clearSession | typeof receiveCredential
>;
