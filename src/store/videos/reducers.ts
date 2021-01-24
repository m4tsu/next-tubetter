import produce, { Draft } from "immer";
import { Reducer } from "redux";
import { VideosActions } from "./actions";
import { VideosState } from "./models";

const initialState: VideosState = {
  ids: [],
  entities: {},
};

export const videosReducer: Reducer<VideosState, VideosActions> = produce(
  (draft: Draft<VideosState>, action: VideosActions) => {
    switch (action.type) {
      case "videos/received": {
        draft.ids = action.payload.ids;
        draft.entities = action.payload.videos;
        break;
      }
      case "videos/add": {
        const { video } = action.payload;
        draft.ids.push(video.id);
        draft.entities[video.id] = video;
        break;
      }
      default: {
        const _: never = action;
      }
    }
  },
  initialState
);
