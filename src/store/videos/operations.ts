import { videosApi } from '@/api/videos';
import { useCallback } from 'react';
import { receiveUsers, useUsersDispatch } from '../users/actions';
import { receiveVideos, useVideosDispatch } from './actions';
import { normalizeVideos, videoNormalizrSchemaKey } from './models';

export const useFetchVideos = () => {
  const videosDispatch = useVideosDispatch();
  const usersDispatch = useUsersDispatch();
  const fetchVideos = useCallback(
    async (uid: string, filterTag?: string, limit?: number) => {
      try {
        const videos = await videosApi.fetchVideos(uid, filterTag, limit);
        console.log(videos);
        const normalized = normalizeVideos(videos);
        videosDispatch(
          receiveVideos(
            normalized.entities[videoNormalizrSchemaKey],
            normalized.result
          )
        );
        usersDispatch(receiveUsers(normalized.entities.users, []));
      } catch (err) {
        console.log(err);
      }
    },
    [videosDispatch, usersDispatch]
  );
  return { fetchVideos };
};
