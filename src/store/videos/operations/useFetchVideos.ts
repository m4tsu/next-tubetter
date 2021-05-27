// import { videosApi } from '@/api/videos';
// import { useCallback } from 'react';
// import { receiveVideos, useVideosDispatch } from '../actions';
// import { normalizeVideos } from '@/store/videos/models';

// export const useFetchVideos = () => {
//   const videosDispatch = useVideosDispatch();
//   const fetchVideos = useCallback(
//     async (uid: string, filterTag?: string, limit?: number) => {
//       try {
//         const videos = await videosApi.fetchVideos(uid, filterTag, limit);
//         console.log(videos);
//         const normalized = normalizeVideos(videos);
//         videosDispatch(receiveVideos(normalized));
//       } catch (err) {
//         console.log(err);
//       }
//     },
//     [videosDispatch]
//   );
//   return { fetchVideos };
// };
export {};
