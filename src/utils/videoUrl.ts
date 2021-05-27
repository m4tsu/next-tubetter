import { VideoType } from '@/store/videos/models';

export const getVideoUrl = ({
  videoId,
  type,
}: {
  videoId: string;
  type: VideoType;
}) => {
  switch (type) {
    case 'video': {
      return `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    case 'playlist': {
      return `https://www.youtube.com/embed/videoseries?list=${videoId}`;
    }
    case 'nicovideo': {
      return `https://embed.nicovideo.jp/watch/${videoId}?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1`;
    }
    default: {
      throw new Error('invalid videoType');
    }
  }
};
