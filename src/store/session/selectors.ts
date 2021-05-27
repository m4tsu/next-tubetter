import { AppState } from '@/store/store';

export const sessionStateSelector = ({ session }: AppState) => session;

export const currentUserSelector = ({ session }: AppState) =>
  session.currentUser;

export const credentialSelector = ({ session: { credential } }: AppState) => {
  return credential;
};
