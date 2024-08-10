import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ArticlePreview from "./ArticlePreview";

import articleService from "../services/articles";

// scope is pased up to ArticlePreview to let it know if should be or not
// removed from the list shown after unfavorited
// In ProfileFavorites when unfavorited an article it gets removed from the list
function ArticlesList({ scope, articlesList, user }) {
  // const articlesList = useSelector((state) => state.articles);
  // console.log("articleList in ArticleList", articlesList);

  /* const queryResult = useQuery({
    queryKey: ["articles", { filter }, { user }],
    queryFn: () => articleService.getAllFeed(filter.params, user),
    refetchOnWindowFocus: false,
  }); */

  if (!articlesList) {
    return <div className="article-preview">Loading...</div>;
  }

  if (articlesList.articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articlesList.articles.map((article) => (
        <ArticlePreview
          key={article.slug}
          article={article}
          scope={scope}
          user={user}
        />
      ))}
    </div>
  );
}
export default ArticlesList;
