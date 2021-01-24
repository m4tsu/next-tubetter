import { AuthUser } from "@/store/session/models";

export const receiveUser = (authUser: AuthUser) => ({
  type: "session/userReceived" as const,
  payload: { authUser },
});

export const clearSession = () => ({
  type: "session/clear" as const,
});

export type SessionActions = ReturnType<
  typeof receiveUser | typeof clearSession
>;
