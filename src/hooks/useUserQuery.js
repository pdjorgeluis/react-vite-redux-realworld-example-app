import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

const useUserQuery = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: userService.getCurrentUser,
    refetchOnWindowFocus: false,
    retry: 1,
  });

export default useUserQuery;
