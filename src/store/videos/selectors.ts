import { createSelector } from 'reselect';
import { AppState } from '@/store/store';
import { denormalizeVideos } from './models';

export const recentVideosSelector = createSelector(
  [
    ({
      videos: {
        recentVideos: { ids },
      },
    }: AppState) => ids,
    ({ entities: { videos } }: AppState) => videos,
    ({ entities: { users } }: AppState) => users,
  ],
  (recentVideoIds, videos, users) => {
    console.log(videos, recentVideoIds);
    return denormalizeVideos({
      result: recentVideoIds,
      entities: { videos, users },
    });
  }
);

export const recentVideosStatusSelector = ({
  videos: {
    recentVideos: { isAllFetched, lastVideoDoc, isLoading, isMoreLoading },
  },
}: AppState) => ({
  isAllFetched,
  lastVideoDoc,
  isLoading,
  isMoreLoading,
});

export const recentVideoSelector = createSelector(
  ({ entities: { videos } }: AppState) => videos,
  (videos) => (id: string) => {
    const video = videos[id];
    return video;
  }
);
