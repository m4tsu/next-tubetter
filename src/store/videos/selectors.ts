import { createSelector } from "reselect";
import { AppState } from "@/store/store";
import { denormalizeVideos } from "./models";

export const getVideos = createSelector(
  [({ videos }: AppState) => videos, ({ users }: AppState) => users],
  (videos, users) => {
    return denormalizeVideos({
      result: videos.ids,
      entities: { videos: videos.entities, users: users.entities },
    });
  }
);
