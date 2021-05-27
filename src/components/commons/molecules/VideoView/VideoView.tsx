import { VideoType } from '@/store/videos/models';
import { getVideoUrl } from '@/utils/videoUrl';
import styled from '@emotion/styled';
import React, { FC } from 'react';

export type VideoViewSize = 'small';

type Props = {
  videoId: string;
  videoType: VideoType;
  size?: VideoViewSize;
};

type ComponentProps = {
  embedSrc: string;
  size?: VideoViewSize;
};

const ResponsiveVideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin-bottom: 0.5em;
  iframe {
    position: absolute;
    top: 0;
    right: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

const Component: FC<ComponentProps> = ({ embedSrc, size }) => (
  <>
    {size === 'small' ? (
      <iframe
        src={embedSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded content."
        width="480"
        height="270"
      />
    ) : (
      <ResponsiveVideoWrapper>
        <iframe
          src={embedSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded content"
        />
      </ResponsiveVideoWrapper>
    )}
  </>
);

export const VideoView: FC<Props> = React.memo(
  ({ videoId, videoType, size }) => {
    const embedSrc = getVideoUrl({ videoId, type: videoType });
    console.log('videoView render', embedSrc);
    return <Component embedSrc={embedSrc} size={size} />;
  }
);
