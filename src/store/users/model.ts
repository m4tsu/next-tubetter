import { denormalize, normalize, schema } from 'normalizr';

export type User = {
  uid: string;
  photoURL: string;
  displayName: string;
};

export const userNormalizrSchemaKey = 'users' as const;

export const userNormalizrSchema = new schema.Entity<User>(
  userNormalizrSchemaKey,
  {},
  {
    idAttribute: 'uid',
  }
);

export type NormalizedUsers = {
  [uid: string]: User;
};

export type UsersState = Readonly<{
  ids: User['uid'][];
}>;

export const normalizeUsers = (users: User[]) =>
  normalize<
    User,
    {
      [userNormalizrSchemaKey]: NormalizedUsers;
    },
    User['uid'][]
  >(users, [userNormalizrSchema]);

export const denormalizeVideos = (
  users: ReturnType<typeof normalizeUsers>
): User[] => denormalize(users.result, [userNormalizrSchema], users.entities);
