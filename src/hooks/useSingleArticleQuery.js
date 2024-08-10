import { useQuery } from "@tanstack/react-query";
import articleService from "../services/articles";

const useSingleArticleQuery = (articleSlug) =>
  useQuery({
    queryKey: ["article", articleSlug],
    queryFn: () => articleService.getBySlug(articleSlug),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!articleSlug,
  });

export default useSingleArticleQuery;
