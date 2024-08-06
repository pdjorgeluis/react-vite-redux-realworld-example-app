import React, { useEffect, useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  createArticle,
  initializeArticles,
  update,
} from "../reducers/articleReducer";
import tagsService from "../services/tags";
import articleService from "../services/articles";

function Editor({ articleSlug }) {
  const dispatch = useDispatch();
  const [inputTag, setInputTag] = useState();
  const [tags, setTags] = useState([]);
  // const [tagsToShow, setTagsToShow] = useState([]);
  const [article, setArticle] = useState(null);

  const [state, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // tagsService.getAll().then((fetchedTags) => setTags(fetchedTags.tags));
    if (articleSlug) {
      articleService.getBySlug(articleSlug).then((a) => {
        setArticle(a.article);
        console.log("article in effect", a.article);

        // setTagsToShow(a.article.tagList);
      });
    }
  }, [articleSlug]);

  useEffect(() => {
    if (article) {
      setTags(article.tagList);
    }
  }, [article]);

  const handlePublish = async (event) => {
    event.preventDefault();
    const newArticle = {
      article: {
        title: event.target.title.value,
        description: event.target.description.value,
        body: event.target.body.value,
        tagList: !inputTag ? tags : tags.concat(inputTag),
      },
    };
    if (!articleSlug) {
      dispatch(createArticle(newArticle));
    } else {
      const a = await dispatch(update(articleSlug, newArticle));
      console.log("a", a);

      setArticle(a);
    }

    setInputTag("");
  };

  const handleOnChangeTag = (event) => {
    setInputTag(event.target.value.toLowerCase());
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const tagsToShow = tags || null;
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              <li>That title is required</li>
            </ul>

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
                    {tagsToShow &&
                      tagsToShow.map((t) => (
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
