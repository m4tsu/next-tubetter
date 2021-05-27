import firebase from 'firebase/app';

export const FS_KEY = {
  USERS: 'users',
  VIDEOS: 'videos',
  TAGS: 'tags',
  TIMELINE: 'timeline',
  LIKE_VIDEOS: 'likevideos',
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
} as const;

export const getFirestoreTimeStamp = (date: Date) => {
  return firebase.firestore.Timestamp.fromDate(date);
};
