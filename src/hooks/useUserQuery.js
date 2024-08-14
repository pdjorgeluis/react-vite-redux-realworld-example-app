import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

const useUserQuery = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: userService.getCurrentUser,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { isLoading, isError, error, user: data || { user: null } };
};

export default useUserQuery;
