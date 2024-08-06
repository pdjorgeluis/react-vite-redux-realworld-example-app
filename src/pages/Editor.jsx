import React, { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createArticle,
  initializeArticles,
  update,
} from "../reducers/articleReducer";
import tagsService from "../services/tags";
import articleService from "../services/articles";
import Notifications from "../components/Notifications";

function Editor({ articleSlug }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputTag, setInputTag] = useState();
  const [tags, setTags] = useState([]);
  // const [tagsToShow, setTagsToShow] = useState([]);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  // const [state, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // tagsService.getAll().then((fetchedTags) => setTags(fetchedTags.tags));
    if (articleSlug) {
      console.log("Slug in effect", articleSlug);
      articleService.getBySlug(articleSlug).then((a) => {
        setArticle(a.article);

        setTags(a.article.tagList);
      });
    }
    return () => setTags([]);
  }, [articleSlug]);

  /** useEffect(() => {
    if (article) {
      setTags(article.tagList);
    }
  }, [article]); */

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
      if (!articleSlug) {
        // const nArt = dispatch(createArticle(newArticle));
        const createdArticle = await articleService.create(newArticle);
        console.log("created article", createdArticle);
        navigate(`/${createdArticle.article.author.username}`);
      } else {
        // const a = await dispatch(update(articleSlug, newArticle));
        // console.log("a", a);
        const updatedArticle = await articleService.update(
          articleSlug,
          newArticle
        );
        console.log("updated article", updatedArticle);

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

  // const tagsToShow = tags || null;
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
