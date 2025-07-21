import { useUserProfile } from "./use-user-profile";

export const useIsNewUser = (userId: string | null) => {
  const { data, isLoading, error, isError } = useUserProfile(userId);

  // If error is 'User not found', user is new
  const isNewUser =
    isError && error instanceof Error && error.message === "User not found";

  return { isNewUser, isLoading, error };
};
