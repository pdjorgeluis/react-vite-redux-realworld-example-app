import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../services/profiles";

const useProfileMutation = (username, queryKey) => {
  const queryClient = useQueryClient();

  const mutations = {
    fallowUserMutation: useMutation({
      mutationFn: () => profileService.followUser(username),
      onSuccess: (newObject) => {
        queryClient.setQueryData(queryKey, newObject);
      },
      onError: (error) => console.log(error),
    }),
    unfallowUserMutation: useMutation({
      mutationFn: () => profileService.unfollowUser(username),
      onSuccess: (newObject) => {
        queryClient.setQueryData(queryKey, newObject);
      },
      onError: (error) => console.log(error),
    }),
  };

  return { ...mutations };
};

export default useProfileMutation;
