import {
  User,
  userNormalizrSchema,
  userNormalizrSchemaKey,
  NormalizedUsers,
} from '@/store/users/model';
import { schema, normalize, denormalize } from 'normalizr';
import firebase from 'firebase/app';
import { TimeStamp } from '@/lib/firebase/config';

export type VideoType = 'video' | 'playlist' | 'nicovideo';

export type Video = {
  id: string; // FireStore doc Id
  videoId: string; // youtubeやnicovideo の videoID
  type: VideoType;
  title: string;
  comment: string;
  user: User;
  tags: string[]; //tagIDの配列
  likeCount: number;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
};

export type NormalizedVideo = Omit<Video, 'user'> & {
  user: User['uid'];
};

export type NormalizedVideos = {
  [id: string]: NormalizedVideo;
};

export type VideosState = Readonly<{
  recentVideos: {
    ids: Video['id'][];
    isLoading: boolean;
    isMoreLoading: boolean;
    isAllFetched: boolean;
    lastVideoDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null;
  };
}>;

export const videoNormalizrSchemaKey = 'videos' as const;
export const videoNormalizrSchema = new schema.Entity<Video>(
  videoNormalizrSchemaKey,
  { user: userNormalizrSchema },
  {
    idAttribute: 'id',
  }
);

/*
[{id: 'videoA', user: {uid: 'userA'}}, {id: 'videoB', user: {uid: 'userB'}}]
↓
{
  result: ['videoA', 'videoB'],
  entities: {
    videos: {
      'videoA': {
        id: 'videoA',
        user: 'userA'
      },
      'videoB': {
        id: 'videoB',
        user: 'userB'
      }
    },
    users: {
      'userA': {
        uid: 'userA'
      },
      'userB': {
        uid: 'userB'
      }
    }
  }
}
*/
export const normalizeVideos = (videos: Video[]) =>
  normalize<
    Video,
    {
      [videoNormalizrSchemaKey]: NormalizedVideos;
      [userNormalizrSchemaKey]: NormalizedUsers;
    },
    Video['id'][]
  >(videos, [videoNormalizrSchema]);

export const denormalizeVideos = (
  videos: ReturnType<typeof normalizeVideos>
): Video[] =>
  denormalize(videos.result, [videoNormalizrSchema], videos.entities);
