import {
  NormalizedVideo,
  NormalizedVideos,
  Video,
  VideosState,
} from '@/store/videos/models';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NormalizedUsers } from '@/store/users/model';

export const fetchRecentVideosStarted = () => ({
  type: 'videos/recent/fetchStarted' as const,
});

export const receiveRecentVideos = (
  payload: {
    entities: { videos: NormalizedVideos; users: NormalizedUsers };
  } & Omit<VideosState['recentVideos'], 'isLoading' | 'isMoreLoading'>
) => ({
  type: 'videos/recent/receive' as const,
  payload,
});

export const fetchMoreRecentVideosStarted = () => ({
  type: 'videos/recent/fetchMoreStarted' as const,
});
export const receiveAdditionalRecentVideos = (
  payload: {
    entities: { videos: NormalizedVideos; users: NormalizedUsers };
  } & Omit<VideosState['recentVideos'], 'isLoading' | 'isMoreLoading'>
) => ({
  type: 'videos/recent/additionalReceive' as const,
  payload,
});

export const addVideos = (video: NormalizedVideo) => ({
  type: 'videos/add' as const,
  payload: { video },
});

export type VideosActions = ReturnType<
  | typeof fetchRecentVideosStarted
  | typeof fetchMoreRecentVideosStarted
  | typeof receiveRecentVideos
  | typeof receiveAdditionalRecentVideos
  | typeof addVideos
>;

export const useVideosDispatch = () => useDispatch<Dispatch<VideosActions>>();
