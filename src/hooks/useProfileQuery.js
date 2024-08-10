import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profiles";

const useProfileQuery = (username, user) =>
  useQuery({
    queryKey: ["profile", username, user],
    queryFn: () => profileService.getUserProfile(username, user),
    refetchOnWindowFocus: false,
    retry: 1,
  });

export default useProfileQuery;
