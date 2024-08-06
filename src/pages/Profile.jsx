import React, { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileServices from "../services/profiles";
import ArticlesList from "../components/ArticlesList";
import { initializeArticles } from "../reducers/articleReducer";

function Profile({ username, user }) {
  const [profile, setProfile] = useState(null);
  const [filter, setFilter] = useState({
    feed: "MY",
    params: { offset: 0, author: username },
  });

  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const limit = 10;
  const pages = Math.ceil(articlesCount / limit);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeArticles(filter.params, user));
  }, [filter, user]);

  useEffect(() => {
    profileServices.getUserProfile(username, user).then((prof) => {
      setProfile(prof.profile);
      setFilter({ feed: "MY", params: { offset: 0, author: username } });
    });
  }, [username, user]);

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
    setFilter({
      feed: "MY",
      params: { ...filter.params, author: username, favorited: null },
    });
  };

  const handleFavoritedFeedClick = () => {
    setFilter({
      feed: "FAV",
      params: { ...filter.params, favorited: username, author: null },
    });
  };

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

            <ArticlesList scope={filter.feed} />

            <ul className="pagination">
              {Array.from({ length: pages }, (v, i) => (
                <li
                  className={
                    filter.params.offset === i
                      ? "page-item active"
                      : "page-item"
                  }
                  key={i}
                >
                  <button
                    className="page-link"
                    type="button"
                    onClick={() =>
                      setFilter({
                        ...filter,
                        params: { ...filter.params, offset: i * limit },
                      })
                    }
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
