import { schema } from "normalizr";

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
