import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profiles";

const useProfileQuery = (username, user) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profile", username, user],
    queryFn: () => profileService.getUserProfile(username, user),
    refetchOnWindowFocus: false,
    enabled: !!username,
  });

  return { isLoading, isError, error, profile: data || { profile: null } };
};
export default useProfileQuery;
