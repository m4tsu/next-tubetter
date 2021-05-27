/* eslint-disable react/display-name */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import {
  ScrollableVideos,
  ScrollableVideosProps,
} from '@/components/commons/organisms/ScrollableVideos/ScrollableVideos';
import { useSelector } from '@/store/store';
import { Video } from '@/store/videos/models';
import { useRecentVideos } from '@/store/videos/operations/useRecentVideos';
import {
  recentVideosIdsSelector,
  recentVideosSelector,
  recentVideosStatusSelector,
} from '@/store/videos/selectors';

type RecentVideosProps = {
  videoCardSize?: 'small';
};

const Component: FC<ScrollableVideosProps> = React.memo((props) => (
  <section>
    <Heading as="h2" textAlign="center" size="md" mb={8}>
      新着登録動画
    </Heading>
    <ScrollableVideos {...props} />
  </section>
));

const MAX_VIDEOS_NUMBER = 32;

export const RecentVideos: FC<RecentVideosProps> = React.memo(
  ({ videoCardSize }) => {
    // const videos: Video[] = useSelector(recentVideosSelector);
    const videoIds = useSelector(recentVideosIdsSelector);
    const {
      isAllFetched,
      isLoading: loading,
      isMoreLoading: loadingMore,
    } = useSelector(recentVideosStatusSelector);
    const { getRecentVideos, getMoreRecentVideos } = useRecentVideos();
    console.log('RecentVideos rendered!!!');

    const [fetchLimited, setFetchLimited] = useState(false);
    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (loadingMore || fetchLimited) return;
        const element = e.target;
        const threshold = 10;
        const { scrollHeight, scrollTop, clientHeight } = element as any;
        if (
          !isAllFetched &&
          scrollHeight - scrollTop - threshold < clientHeight
        ) {
          getMoreRecentVideos();
        }
      },
      [isAllFetched, fetchLimited, getMoreRecentVideos, loadingMore]
    );

    useEffect(() => {
      getRecentVideos();
    }, []);

    useEffect(() => {
      // if (videos.length >= MAX_VIDEOS_NUMBER) {
      if (videoIds.length >= MAX_VIDEOS_NUMBER) {
        setFetchLimited(true);
      }
    }, [videoIds]);
    return (
      <Component
        // videos={videos}
        videoIds={videoIds}
        loading={loading}
        loadingMore={loadingMore}
        handleScroll={handleScroll}
        videoCardSize={videoCardSize}
      />
    );
  }
);
