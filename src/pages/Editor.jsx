import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import articleService from "../services/articles";
import Notifications from "../components/Notifications";

function Editor({ articleSlug }) {
  const navigate = useNavigate();

  const [inputTag, setInputTag] = useState();
  const [tags, setTags] = useState([]);

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articleSlug) {
      articleService.getBySlug(articleSlug).then((a) => {
        setArticle(a.article);
        setTags(a.article.tagList);
      });
    }
    return () => setTags([]);
  }, [articleSlug]);

  const handlePublish = async (event) => {
    setError(null);
    event.preventDefault();
    const newArticle = {
      article: {
        title: event.target.title.value,
        description: event.target.description.value,
        body: event.target.body.value,
        tagList: !inputTag ? tags : tags.concat(inputTag),
      },
    };
    try {
      // If articleSlug was NOT passed to the Editor component, Publish button
      // will create a new article and redirect to owner's profile.
      // If articleSlug is passed then Editor component is for edit/update article.
      if (!articleSlug) {
        const createdArticle = await articleService.create(newArticle);
        navigate(`/${createdArticle.article.author.username}`);
      } else {
        const updatedArticle = await articleService.update(
          articleSlug,
          newArticle
        );
        setArticle(updatedArticle.article);
        setTags(updatedArticle.article.tagList);
      }
      setInputTag("");
    } catch (exception) {
      setError(exception);
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
            <Notifications error={error} />

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
                        >
                          <i className="ion-close-round" key={t} />
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
