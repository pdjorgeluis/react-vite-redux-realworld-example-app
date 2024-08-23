import { useQuery } from "@tanstack/react-query";
import articleService from "../services/articles";

const useCommentsQuery = (slug, user) =>
  useQuery({
    queryKey: ["comments", slug, user],
    queryFn: () => articleService.getComments(slug, user),
    refetchOnWindowFocus: false,
    enabled: !!slug,
  });

export default useCommentsQuery;
