import { useQuery } from "@tanstack/react-query";
import articleService from "../services/articles";

const selectGet = (filter, user) => {
  switch (filter.feed) {
    case "GLOBAL": {
      return {
        getFunction: articleService.getAll,
        keys: { params: filter.params, user },
      };
    }
    case "TAG": {
      return {
        getFunction: articleService.getByTag,
        keys: { params: filter.params },
      };
    }
    case "YOUR": {
      return {
        getFunction: articleService.getAllFeed,
        keys: { params: filter.params },
      };
    }
    default:
      return null;
  }
};

const useArticlesQuery = (filter, user) => {
  const { getFunction, keys } = selectGet(filter, user);

  const queryResult = useQuery({
    queryKey: ["articles", { filter }, { user }],
    queryFn: () => getFunction(keys),
    refetchOnWindowFocus: false,
  });
  console.log("query in useArticlesQuery", queryResult.data);

  return { queryResult };
};

export default useArticlesQuery;
