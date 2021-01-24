export const dummyAction = () => ({
  type: "dummy" as const,
});

export type UsersActions = ReturnType<typeof dummyAction>;
