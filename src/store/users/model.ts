import { denormalize, normalize, schema } from "normalizr";

export type User = {
  uid: string;
  pthotoURL: string;
  displayName: string;
};

export const userNormalizrSchemaKey = "users" as const;

export const userNormalizrSchema = new schema.Entity<User>(
  userNormalizrSchemaKey,
  {},
  {
    idAttribute: "uid",
  }
);

export type NormalizedUsersEntities = {
  [uid: string]: User;
};

export type UsersState = Readonly<{
  ids: User["uid"][];
  entities: NormalizedUsersEntities;
}>;

export const normalizeUsers = (users: User[]) =>
  normalize<
    User,
    {
      [userNormalizrSchemaKey]: NormalizedUsersEntities;
    },
    User["uid"][]
  >(users, [userNormalizrSchema]);

export const denormalizeVideos = (
  users: ReturnType<typeof normalizeUsers>
): User[] => denormalize(users.result, [userNormalizrSchema], users.entities);
