import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../services/profiles";

const useProfileMutation = (username, queryKey) => {
  const queryClient = useQueryClient();

  const mutations = {
    fallowUserMutation: useMutation({
      mutationFn: async () => profileService.followUser(username),
      onSuccess: (newObject) => {
        queryClient.setQueryData(queryKey, newObject);
        // queryClient.invalidateQueries(["articles"]);
        // queryClient.invalidateQueries(["profile"]);
      },
      onError: (error) => console.log(error),
    }),
    unfallowUserMutation: useMutation({
      mutationFn: async () => profileService.unfollowUser(username),
      onSuccess: (newObject) => {
        queryClient.setQueryData(queryKey, newObject);
        // queryClient.invalidateQueries(["articles"]);
        // queryClient.invalidateQueries(["profile"]);
      },
      onError: (error) => console.log(error),
    }),
  };

  return { ...mutations };
};

export default useProfileMutation;
