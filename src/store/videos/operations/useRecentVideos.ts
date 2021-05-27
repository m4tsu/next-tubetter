import { useCallback, useState } from 'react';
import { videosApi } from '@/api/videos';
import { useSelector } from '@/store/store';
import {
  fetchMoreRecentVideosStarted,
  fetchRecentVideosStarted,
  receiveAdditionalRecentVideos,
  receiveRecentVideos,
  useVideosDispatch,
} from '@/store/videos/actions';
import { normalizeVideos } from '@/store/videos/models';
import { recentVideosStatusSelector } from '@/store/videos/selectors';

export const useRecentVideos = () => {
  const dispatch = useVideosDispatch();
  const { lastVideoDoc } = useSelector(recentVideosStatusSelector);

  const getRecentVideos = useCallback(async () => {
    dispatch(fetchRecentVideosStarted());
    try {
      const {
        videos,
        isAllFetched,
        lastDoc,
      } = await videosApi.fetchRecentVideos();
      const normalized = normalizeVideos(videos);
      dispatch(
        receiveRecentVideos({
          entities: normalized.entities,
          ids: normalized.result,
          isAllFetched,
          lastVideoDoc: lastDoc,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const getMoreRecentVideos = useCallback(async () => {
    if (!lastVideoDoc) {
      return;
    }
    dispatch(fetchMoreRecentVideosStarted());
    try {
      const {
        videos,
        lastDoc,
        isAllFetched,
      } = await videosApi.fetchMoreRecentVideos(lastVideoDoc);
      const normalized = normalizeVideos(videos);
      dispatch(
        receiveAdditionalRecentVideos({
          entities: normalized.entities,
          ids: normalized.result,
          isAllFetched,
          lastVideoDoc: lastDoc,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, lastVideoDoc]);

  return { getRecentVideos, getMoreRecentVideos };
};
