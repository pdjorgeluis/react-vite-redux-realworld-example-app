import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileServices from "../services/profiles";
import ArticlesList from "../components/ArticlesList";
import {
  initializeArticles,
  favoriteAnArticle,
  unfavoriteAnArticle,
} from "../reducers/articleReducer";

function Profile({ username, user }) {
  const [profile, setProfile] = useState(null);
  const [filter, setFilter] = useState({
    feed: "MY",
    params: { author: username },
  });
  const [page, setPage] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const articlesCount = useSelector((state) => state.articles.articlesCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeArticles(filter.params, user));
  }, [filter, page, user]);

  const articlesList = useSelector((state) => state.articles);

  useEffect(() => {
    profileServices
      .getUserProfile(username, user)
      .then((prof) => setProfile(prof.profile));
  }, [username, user]);

  /* useEffect(() => {
        dispatch(initializeArticles({}, user));
  }, [params, page]); */

  const handleFollowCLick = async () => {
    if (profile.following === false) {
      const updatedProfile = await profileServices.followUser(profile.username);
      setProfile(updatedProfile.profile);
    } else {
      const updatedProfile = await profileServices.unfollowUser(
        profile.username
      );
      setProfile(updatedProfile.profile);
    }
  };

  const handleMyFeedClick = () => {
    setFilter({ feed: "MY", params: { author: username } });
  };

  const handleFavoritedFeedClick = () => {
    setFilter({ feed: "FAV", params: { favorited: username } });
  };

  /* const handleFavoriteCLick = () => {
    if (article.favorited === false) {
      dispatch(favoriteAnArticle(article.slug));
    } else {
      dispatch(unfavoriteAnArticle(article.slug));
    }
    forceUpdate();
  }; */

  if (!profile) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile.image}
                alt={profile.username}
                className="user-img"
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {user.username !== username && (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  type="button"
                  onClick={handleFollowCLick}
                >
                  <i
                    className={
                      profile.following ? "ion-minus-round" : "ion-plus-round"
                    }
                  />
                  &nbsp; Follow {profile.username}
                </button>
              )}
              {user.username === username && (
                <Link
                  className="btn btn-sm btn-outline-secondary action-btn"
                  to="/settings"
                >
                  <i className="ion-gear-a" />
                  &nbsp; Edit Profile Settings
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    className={`nav-link ${filter.feed === "MY" ? "active" : ""}`}
                    type="button"
                    onClick={handleMyFeedClick}
                  >
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${filter.feed === "FAV" ? "active" : ""}`}
                    type="button"
                    onClick={handleFavoritedFeedClick}
                  >
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>

            <ArticlesList articlesList={articlesList} scope="PROFILE" />

            <div className="article-preview">
              <div className="article-meta">
                <Link to="/profile/albert-pai">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </Link>
                <div className="info">
                  <Link to="/profile/albert-pai" className="author">
                    Albert Pai
                  </Link>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart" /> 32
                </button>
              </div>
              <Link to="/article/the-song-you" className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </Link>
            </div>

            <ul className="pagination">
              <li className="page-item active">
                <Link className="page-link" to="">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="">
                  2
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
