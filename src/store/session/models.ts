export type AuthUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  screenName: string | null;
  likeCount?: number;
};
