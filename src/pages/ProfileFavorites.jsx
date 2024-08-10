import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileServices from "../services/profiles";
import ArticlesList from "../components/ArticlesList";
import { initializeArticles } from "../reducers/articleReducer";

import { getLocalLoggedUser } from "../hooks/useCurrentUser";
import useArticlesQuery from "../hooks/useArticlesQuery";
import useProfileQuery from "../hooks/useProfileQuery";
import useProfileMutation from "../hooks/useProfileMutation";

function ProfileFavorites({ username }) {
  // const user = useSelector((state) => state.loggedUser.user);
  // Check if needed to ask for user below
  // const [profile, setProfile] = useState(null);

  const currentUser = getLocalLoggedUser();
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useProfileQuery(username, currentUser.user);

  const { fallowUserMutation, unfallowUserMutation } = useProfileMutation(
    profile?.profile.username,
    ["profile", username, currentUser.user]
  );

  // const [offset, setOffset] = useState(0);

  const [filter, setFilter] = useState({
    tag: "",
    feed: "GLOBAL",
    params: { offset: 0, favorited: username },
  });

  /* const [filter, setFilter] = useState({
    feed: "FV",
    params: { offset: 0, favorited: username },
  }); */

  // const dispatch = useDispatch();

  // Article's list is initialized depending of selected tabs My Articles and Favorited Articles
  /* useEffect(() => {
    dispatch(initializeArticles({ offset, favorited: username }, user));
  }, [offset, user]); */

  const { queryResult } = useArticlesQuery(filter, currentUser);
  const articlesList = queryResult.data;

  const articlesCount = articlesList?.articlesCount || null; // const articlesCount = useSelector((state) => state.articles.articlesCount);
  const limit = 10;
  const pages = Math.ceil(articlesCount / limit);

  /* useEffect(() => {
    profileServices.getUserProfile(username, user).then((prof) => {
      setProfile(prof.profile);
      setOffset(0);
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
  }; */

  const handleFollowCLick = async () => {
    if (profile.profile.following === false) {
      fallowUserMutation.mutate();
    } else {
      unfallowUserMutation.mutate();
    }
  };

  /* const handleMyFeedClick = () => {
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
  }; */

  if (queryResult.isLoading || isProfileLoading) {
    return <div>loading data...</div>;
  }

  if (queryResult.isError || isProfileError) {
    return (
      <span>
        blogs service is not available due to problems in server
        <br />
        Error: {queryResult.error?.message || profileError?.message}
      </span>
    );
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile.profile.image}
                alt={profile.profile.username}
                className="user-img"
              />
              <h4>{profile.profile.username}</h4>
              <p>{profile.bio}</p>
              {currentUser.user.username !== username && (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  type="button"
                  onClick={handleFollowCLick}
                >
                  <i
                    className={
                      profile.profile.following
                        ? "ion-minus-round"
                        : "ion-plus-round"
                    }
                  />
                  &nbsp; Follow {profile.profile.username}
                </button>
              )}
              {currentUser.user.username === username && (
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
                  <Link className="nav-link" to={`/${username}`}>
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="">
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <ArticlesList
              scope="FAV"
              articlesList={articlesList}
              user={currentUser}
            />

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

export default ProfileFavorites;
