import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import articleService from "../services/articles";

const selectArticleMutation = (fn) => {
  switch (fn) {
    case "FAVORITE": {
      return articleService.favoriteArticle;
    }
    case "UNFAVORITE": {
      return articleService.unfavoriteArticle;
    }
    case "UPDATE": {
      return articleService.update;
    }
    case "CREATE": {
      return articleService.create;
    }
    case "DELETE": {
      return articleService.deleteArticle;
    }
    default:
      return null;
  }
};

const useArticleUpdateMutation = (fn, queryKey) => {
  const mutationFunction = selectArticleMutation(fn);
  const [updatedArticle, setArticle] = useState(null);
  const queryClient = useQueryClient();

  const articleMutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: (newArticle) => {
      queryClient.invalidateQueries(queryKey);
      setArticle(newArticle);
    },
    onError: (error) => console.log(error),
  });

  return { articleMutation, updatedArticle };
};

export default useArticleUpdateMutation;
