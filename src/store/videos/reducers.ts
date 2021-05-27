import produce, { Draft } from 'immer';
import { Action, Reducer } from 'redux';
import { VideosActions } from '@/store/videos/actions';
import { NormalizedVideos, VideosState } from '@/store/videos/models';
import merge from 'lodash/merge';
import { EntitiesActions } from '@/store/store';

const initialState: VideosState = {
  recentVideos: {
    ids: [],
    isLoading: false,
    isMoreLoading: false,
    isAllFetched: false,
    lastVideoDoc: null,
  },
};

export const videoEntitiesReducer: Reducer<
  NormalizedVideos,
  EntitiesActions
> = (state = {}, action) => {
  switch (action.type) {
    default: {
      if (action.payload?.entities?.videos) {
        console.log('video entities reducer', state, action.payload);
        return merge({}, state, action.payload.entities.videos);
      }
      return state;
    }
  }
};

export const videosReducer: Reducer<VideosState, VideosActions> = produce(
  (draft: Draft<VideosState>, action: VideosActions) => {
    switch (action.type) {
      case 'videos/recent/fetchStarted': {
        draft.recentVideos.isLoading = true;
        break;
      }
      case 'videos/recent/receive': {
        draft.recentVideos.ids = action.payload.ids;
        draft.recentVideos.isLoading = false;
        draft.recentVideos.lastVideoDoc = action.payload.lastVideoDoc;
        draft.recentVideos.isAllFetched = action.payload.isAllFetched;
        break;
      }
      case 'videos/recent/fetchMoreStarted': {
        draft.recentVideos.isMoreLoading = true;
        break;
      }
      case 'videos/recent/additionalReceive': {
        draft.recentVideos.ids = draft.recentVideos.ids.concat(
          action.payload.ids
        );
        draft.recentVideos.isMoreLoading = false;
        draft.recentVideos.lastVideoDoc = action.payload.lastVideoDoc;
        draft.recentVideos.isAllFetched = action.payload.isAllFetched;
        break;
      }
      case 'videos/add': {
        console.log('videos/add', action);
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
