import { useQuery } from "@tanstack/react-query";
import articleService from "../services/articles";

const useSingleArticleQuery = (articleSlug) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["article", articleSlug],
    queryFn: () => articleService.getBySlug(articleSlug),
    refetchOnWindowFocus: false,
    enabled: !!articleSlug,
  });

  return { isLoading, isError, error, article: data || { article: null } };
};
export default useSingleArticleQuery;
