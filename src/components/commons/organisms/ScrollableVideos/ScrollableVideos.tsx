import React, { FC } from 'react';
import { Video } from '@/store/videos/models';
import { Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { VideoCardWithUser } from '@/components/commons/molecules/VideoCardWithUser/VideoCardWithUser';

export type ScrollableVideosProps = {
  // videos: Video[];
  videoIds: string[];
  handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  loading: boolean;
  loadingMore: boolean;
  videoCardSize?: 'small';
};

const ScrollWrapper = styled.div`
  height: 84vh;
  overflow: auto;
  will-change: transform;
  overscroll-behavior: none;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
`;

export const ScrollableVideos: FC<ScrollableVideosProps> = ({
  // videos,
  videoIds,
  handleScroll,
  loading,
  loadingMore,
  videoCardSize,
}) => (
  <ScrollWrapper onScroll={handleScroll}>
    {loading ? (
      <div>now loading</div>
    ) : (
      videoIds.map((videoId) => {
        return (
          // TODO: 追加ロードされたあとに、今まで表示されていたVideoCardWithUserも再レンダリングされる
          <VideoCardWithUser
            // video={video}
            videoId={videoId}
            key={videoId}
            scroll
            size={videoCardSize}
          />
        );
      })
    )}
    <LoadingContainer>{loadingMore && <Spinner />}</LoadingContainer>
  </ScrollWrapper>
);
