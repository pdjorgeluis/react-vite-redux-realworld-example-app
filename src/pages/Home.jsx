import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useArticlesQuery from "../hooks/useArticlesQuery";
import useCurrentUser from "../hooks/useCurrentUser";
import tagsService from "../services/tags";
import Banner from "../components/Banner";
import ArticlesList from "../components/ArticlesList";

function Home() {
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState({
    tag: "",
    feed: "GLOBAL",
    params: { offset: 0 },
  });

  const { queryResult } = useArticlesQuery(filter, currentUser.user);
  const articlesList = queryResult.data;

  const articlesCount = articlesList?.articlesCount || null;
  const limit = 10;
  const pages = Math.ceil(articlesCount / limit);
  const [page, setPage] = useState(0);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tags"],
    queryFn: tagsService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return (
      <span>
        blogs service is not available due to problems in server
        <br />
        Error: {error.message}
      </span>
    );
  }

  const tags = data ? data.tags : null;

  const handleTagClick = (t) => {
    setFilter({ tag: t, feed: "TAG", params: { offset: 0, tag: t } });
  };

  const handleGlobalFeedClick = () => {
    setFilter({ tag: "", feed: "GLOBAL", params: { offset: 0 } });
  };

  const handleYourFeedClick = () => {
    queryClient.invalidateQueries([
      "articles",
      { tag: "", feed: "YOUR", params: { offset: 0 } },
      currentUser.user,
    ]);
    setFilter({ tag: "", feed: "YOUR", params: { offset: 0 } });
  };

  if (queryResult.isLoading) {
    return <span>Loading...</span>;
  }

  if (queryResult.isError) {
    return <span>Error: {queryResult.error.message}</span>;
  }

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {currentUser.user && (
                  <li className="nav-item">
                    <button
                      className={`nav-link ${filter.feed === "YOUR" ? "active" : ""}`}
                      type="button"
                      onClick={handleYourFeedClick}
                    >
                      Your Feed
                    </button>
                  </li>
                )}

                <div>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${filter.feed === "GLOBAL" ? "active" : ""}`}
                      type="button"
                      onClick={handleGlobalFeedClick}
                    >
                      Global Feed
                    </button>
                  </li>
                  {filter.tag !== "" && (
                    <li className="nav-item">
                      <button
                        className={`nav-link ${filter.feed === "TAG" ? "active" : ""}`}
                        type="button"
                      >
                        #{filter.tag}
                      </button>
                    </li>
                  )}
                </div>
              </ul>
            </div>
            <ArticlesList
              scope=""
              articlesList={articlesList}
              user={currentUser}
            />

            <ul className="pagination">
              {Array.from({ length: pages }, (v, i) => (
                <li
                  className={page === i ? "page-item active" : "page-item"}
                  key={i}
                >
                  <button
                    className="page-link"
                    type="button"
                    onClick={() => {
                      setPage(i);
                      setFilter({
                        ...filter,
                        params: { ...filter.params, offset: i * limit },
                      });
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags &&
                  tags.map((t) => (
                    <Link
                      key={t}
                      className="tag-pill tag-default"
                      to=""
                      onClick={() => handleTagClick(t)}
                    >
                      {t}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
