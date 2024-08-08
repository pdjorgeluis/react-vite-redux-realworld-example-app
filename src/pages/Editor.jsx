import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";
import articleService from "../services/articles";
import Notifications from "../components/Notifications";

function Editor({ articleSlug }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState(null);

  const { status, fetchStatus, data, error } = useQuery({
    queryKey: ["article", articleSlug],
    queryFn: async () => {
      const result = await articleService.getBySlug(articleSlug);
      setTags(result.article.tagList);
      return result;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!articleSlug,
  });

  const createArticleMutation = useMutation({
    mutationFn: articleService.create,
    onSuccess: (newArticle) => {
      navigate(`/${newArticle.article.author.username}`);
    },
    onError: (exception) => setErrors(exception),
  });

  const updateArticleMutation = useMutation({
    mutationFn: articleService.update,
    onSuccess: (newArticle) => {
      queryClient.setQueryData(["article"], newArticle);
      setTags(newArticle.article.tagList);
      setInputTag("");
    },
  });

  if (status === "pending" && fetchStatus === "fetching") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  const article = data ? data.article : null;

  const handlePublish = async (event) => {
    setErrors(null);
    event.preventDefault();
    if (!articleSlug) {
      const newArticle = {
        article: {
          title: event.target.title.value,
          description: event.target.description.value,
          body: event.target.body.value,
          tagList: !inputTag ? tags : tags.concat(inputTag),
        },
      };
      createArticleMutation.mutate(newArticle);
    } else {
      const newArticle = {
        article: {
          slug: articleSlug,
          title: event.target.title.value,
          description: event.target.description.value,
          body: event.target.body.value,
          tagList: !inputTag ? tags : tags.concat(inputTag),
        },
      };
      updateArticleMutation.mutate(newArticle);
    }
  };

  const handleOnChangeTag = (event) => {
    setInputTag(event.target.value.toLowerCase());
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Notifications error={errors} />

            <form onSubmit={handlePublish}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    defaultValue={article && articleSlug ? article.title : ""}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    defaultValue={
                      article && articleSlug ? article.description : ""
                    }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    name="body"
                    defaultValue={article && articleSlug ? article.body : ""}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tags"
                    value={inputTag}
                    onChange={(event) => handleOnChangeTag(event)}
                  />
                  <div className="tag-list">
                    {tags &&
                      tags.map((t) => (
                        <Link
                          className="tag-default tag-pill"
                          to=""
                          onClick={() => removeTag(t)}
                          key={t}
                        >
                          <i className="ion-close-round" />
                          {t}
                        </Link>
                      ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
