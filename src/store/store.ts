import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionReducer, SessionState } from '@/store/session/reducers';
import { NormalizedVideos, VideosState } from '@/store/videos/models';
import { videoEntitiesReducer, videosReducer } from '@/store/videos/reducers';
import { NormalizedUsers, UsersState } from '@/store/users/model';
import { userEntitiesReducer, usersReducers } from './users/reducers';

// for Redux dev tools
const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware());

type EntitiesState = {
  videos: NormalizedVideos;
  users: NormalizedUsers;
};

export type EntitiesActions = {
  type: string;
  payload?: {
    entities?: Partial<EntitiesState>;
  };
};

const entitiesReducer = combineReducers<EntitiesState>({
  videos: videoEntitiesReducer,
  users: userEntitiesReducer,
});

export type AppState = Readonly<{
  entities: EntitiesState;
  session: SessionState;
  videos: VideosState;
  users: UsersState;
}>;

export const store = createStore(
  combineReducers<AppState>({
    entities: entitiesReducer,
    session: sessionReducer,
    videos: videosReducer,
    users: usersReducers,
  }),
  enhancer
);

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export { useTypedSelector as useSelector };
