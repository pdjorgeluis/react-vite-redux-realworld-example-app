import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useArticleUpdateMutation from "../hooks/useArticleMutation";

import Notifications from "../components/Notifications";
import useSingleArticleQuery from "../hooks/useSingleArticleQuery";
// import { getLocalLoggedUser } from "../hooks/useCurrentUser";
import useCurrentUser from "../hooks/useCurrentUser";

function Editor({ articleSlug }) {
  const navigate = useNavigate();

  const { status, fetchStatus, article, error } =
    useSingleArticleQuery(articleSlug);
  console.log("article in Editor", article);

  // const currentUser = getLocalLoggedUser();
  const { currentUser } = useCurrentUser();

  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState(
    article.article ? article.article.tagList : []
  );
  const [errors, setErrors] = useState(null);

  // check if set Tags effect can be eliminated
  useEffect(() => {
    if (article.article) {
      setTags(article.article.tagList);
    }
  }, [article]);
  // const article = articleSlug && data ? data.article : null;

  const { articleMutation: updateMutation } = useArticleUpdateMutation(
    "UPDATE",
    ["article", articleSlug]
  );
  const { articleMutation: createMutation } = useArticleUpdateMutation(
    "CREATE",
    ["article", articleSlug]
  );

  if (status === "pending" && fetchStatus === "fetching") {
    return <span>Loading...</span>;
  }

  if (articleSlug && status === "error") {
    return <span>Error: {error.message}</span>;
  }

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
      createMutation.mutate(newArticle, {
        onSuccess: () => {
          navigate(`/${currentUser.user.username}`);
        },
      });
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
      updateMutation.mutate(newArticle);
      setInputTag("");
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
                    defaultValue={articleSlug ? article.article?.title : ""}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    defaultValue={
                      articleSlug ? article.article.description : ""
                    }
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    name="body"
                    defaultValue={articleSlug ? article.article.body : ""}
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
