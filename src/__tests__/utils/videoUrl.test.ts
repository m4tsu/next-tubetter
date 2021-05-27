import { getFirestoreTimeStamp } from '@/lib/firebase/utils';
import { User } from '@/store/users/model';
import { Video } from '@/store/videos/models';
import { getVideoUrl } from '@/utils/videoUrl';

describe('getVideoUrl', () => {
  const user: User = {
    uid: 'user1',
    photoURL: 'photoURL',
    displayName: 'User1',
  };
  const video: Video = {
    id: 'test1',
    videoId: 'testVideoId',
    type: 'video',
    title: 'testVideo1',
    comment: 'good!!!',
    user: user,
    tags: ['tagA', 'tagB'],
    likeCount: 1,
    createdAt: getFirestoreTimeStamp(new Date()),
    updatedAt: getFirestoreTimeStamp(new Date()),
  };
  it('should return Youtube Video Url', () => {
    video.videoId = 'youtube001';
    expect(getVideoUrl(video)).toBe(
      `https://www.youtube.com/embed/youtube001?rel=0`
    );
  });

  it('should return Youtube playlist Url', () => {
    video.type = 'playlist';
    video.videoId = 'playlist001';
    expect(getVideoUrl(video)).toBe(
      `https://www.youtube.com/embed/videoseries?list=playlist001`
    );
  });

  it('should return Nicovideo Url', () => {
    video.type = 'nicovideo';
    video.videoId = 'nicovideo001';
    expect(getVideoUrl(video)).toBe(
      `https://embed.nicovideo.jp/watch/nicovideo001?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1`
    );
  });
});
