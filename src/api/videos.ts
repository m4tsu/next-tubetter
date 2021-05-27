import { db } from '@/lib/firebase/config';
import { FS_KEY } from '@/lib/firebase/utils';
import { Video } from '@/store/videos/models';
import firebase from 'firebase/app';

export const fetchVideos = async (
  uid: string,
  filterTag?: string,
  limit = 40
) => {
  const query = filterTag
    ? db
        .collection(FS_KEY.USERS)
        .doc(uid)
        .collection(FS_KEY.VIDEOS)
        .where(FS_KEY.TAGS, 'array-contains', filterTag)
        .orderBy('updatedAt', 'desc')
        .limit(limit)
    : db
        .collection(FS_KEY.USERS)
        .doc(uid)
        .collection(FS_KEY.VIDEOS)
        .orderBy('updatedAt', 'desc')
        .limit(limit);
  const snap = await query.get();
  const videos: Video[] = snap.docs.map((doc) => ({
    ...(doc.data() as Omit<Video, 'id'>),
    id: doc.id,
  }));
  return videos;
};

export const fetchRecentVideos = async () => {
  const query = db.collectionGroup(FS_KEY.VIDEOS).orderBy('updatedAt', 'desc');

  const snap = await query.limit(4).get();
  const videos: Video[] = snap.docs.map((doc) => {
    const data = doc.data() as Video;
    return {
      ...data,
      id: doc.id,
    };
  });
  let lastDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null;
  let isAllFetched = false;
  if (snap.docs.length !== 0) {
    lastDoc = snap.docs[snap.docs.length - 1];
  } else {
    lastDoc = null;
    isAllFetched = true;
  }
  return { videos, lastDoc, isAllFetched };
};

export const fetchMoreRecentVideos = async (
  lastVideoDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => {
  const query = db.collectionGroup(FS_KEY.VIDEOS).orderBy('updatedAt', 'desc');
  const snap = await query.startAfter(lastVideoDoc).limit(4).get();
  const videos: Video[] = snap.docs.map((doc) => {
    const data = doc.data() as Video;
    return {
      ...data,
      id: doc.id,
    };
  });
  let lastDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> | null;
  let isAllFetched = false;
  console.log('fetchMoreRecentVideos', videos);
  if (snap.docs.length === 4) {
    lastDoc = snap.docs[snap.docs.length - 1];
  } else {
    lastDoc = null;
    isAllFetched = true;
  }
  return { videos, lastDoc, isAllFetched };
};

export const videosApi = {
  fetchVideos,
  fetchRecentVideos,
  fetchMoreRecentVideos,
};
