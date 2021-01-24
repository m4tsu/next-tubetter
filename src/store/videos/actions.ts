import {
  NormalizedVideo,
  NormalizedVideosEntities,
  Video,
} from "@/store/videos/models";

export const receiveVideos = (
  videos: NormalizedVideosEntities,
  ids: Video["id"][]
) => ({
  type: "videos/received" as const,
  payload: { videos, ids },
});

export const addVideos = (video: NormalizedVideo) => ({
  type: "videos/add" as const,
  payload: { video },
});

export type VideosActions = ReturnType<typeof receiveVideos | typeof addVideos>;
