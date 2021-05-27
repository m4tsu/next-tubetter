import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NormalizedUsers, User } from './model';

export const dummyAction = () => ({
  type: 'dummy' as const,
});

export const receiveUsers = (users: NormalizedUsers, ids: User['uid'][]) => ({
  type: 'users/received' as const,
  payload: { users, ids },
});

export type UsersActions = ReturnType<typeof dummyAction | typeof receiveUsers>;

export const useUsersDispatch = () => useDispatch<Dispatch<UsersActions>>();
