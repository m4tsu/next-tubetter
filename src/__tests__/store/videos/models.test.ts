import { NormalizedUsersEntities, User } from "@/store/users/model";
import {
  denormalizeVideos,
  NormalizedVideosEntities,
  normalizeVideos,
  Video,
} from "@/store/videos/models";

const user: User = {
  uid: "user1",
  pthotoURL: "photoURL",
  displayName: "User1",
};
const videos: Video[] = [
  {
    id: "test1",
    videoId: "youtube001",
    type: "video",
    title: "testVideo1",
    comment: "good!!!",
    user: user,
    tags: ["tagA", "tagB"],
    likeCount: 1,
  },
  {
    id: "test2",
    videoId: "youtube002",
    type: "video",
    title: "testVideo2",
    comment: "good!!!",
    user: user,
    tags: ["tag!!!!", "tag000000"],
    likeCount: 0,
  },
];

const normalizedVideos: {
  result: string[];
  entities: {
    videos: NormalizedVideosEntities;
    users: NormalizedUsersEntities;
  };
} = {
  result: ["test1", "test2"],
  entities: {
    videos: {
      test1: {
        id: "test1",
        videoId: "youtube001",
        type: "video",
        title: "testVideo1",
        comment: "good!!!",
        user: user.uid,
        tags: ["tagA", "tagB"],
        likeCount: 1,
      },
      test2: {
        id: "test2",
        videoId: "youtube002",
        type: "video",
        title: "testVideo2",
        comment: "good!!!",
        user: user.uid,
        tags: ["tag!!!!", "tag000000"],
        likeCount: 0,
      },
    },
    users: {
      user1: user,
    },
  },
};

describe("normalize", () => {
  it("valid normalize", () => {
    const normalized = normalizeVideos(videos);
    expect(normalized).toMatchObject(normalizedVideos);
  });

  it("valid denormalize", () => {
    expect(denormalizeVideos(normalizedVideos)).toMatchObject(videos);
  });
});
