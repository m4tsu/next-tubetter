import { db } from "@/lib/firebase/config";
import { Video } from "@/store/videos/models";

export const fetchVideos = async (
  uid: string,
  filterTag?: string,
  limit = 40
) => {
  const query = filterTag
    ? db
        .collection("users")
        .doc(uid)
        .collection("videos")
        .where("tags", "array-contains", filterTag)
        .orderBy("updatedAt", "desc")
        .limit(limit)
    : db
        .collection("users")
        .doc(uid)
        .collection("videos")
        .orderBy("updatedAt", "desc")
        .limit(limit);
  const snap = await query.get();
  const videos: Video[] = snap.docs.map((doc) => ({
    ...(doc.data() as Omit<Video, "id">),
    id: doc.id,
  }));
  return videos;
};

export const videosApi = {
  fetchVideos,
};
