import { useMutation, useQueryClient } from "@tanstack/react-query";
import articleService from "../services/articles";

const useCommentMutation = (queryKey) => {
  const queryClient = useQueryClient();

  const mutations = {
    createCommentMutation: useMutation({
      mutationFn: ([slug, comment]) =>
        articleService.createComment(slug, comment),
      onSuccess: (createdObject) => {
        const comments = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, {
          ...comments,
          comments: comments.comments.concat(createdObject.comment),
        });
      },
      onError: (error) => console.log(error),
    }),
    deleteCommentMutation: useMutation({
      mutationFn: ([slug, id]) => articleService.deleteComment(slug, id),
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error) => console.log(error),
    }),
  };

  return { ...mutations };
};

export default useCommentMutation;
