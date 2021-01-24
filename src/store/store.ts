import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { sessionReducer, SessionState } from "@/store/session/reducers";
import { VideosState } from "@/store/videos/models";
import { videosReducer } from "@/store/videos/reducers";
import { UsersState } from "@/store/users/model";
import { usersReducers } from "./users/reducers";

// for Redux dev tools
const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware());

export type AppState = Readonly<{
  session: SessionState;
  videos: VideosState;
  users: UsersState;
}>;

export const store = createStore(
  combineReducers<AppState>({
    session: sessionReducer,
    videos: videosReducer,
    users: usersReducers,
  }),
  enhancer
);

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
export { useTypedSelector as useSelector };
