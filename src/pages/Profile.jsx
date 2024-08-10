import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticlesList from "../components/ArticlesList";
import { getLocalLoggedUser } from "../hooks/useCurrentUser";
import useArticlesQuery from "../hooks/useArticlesQuery";
import useProfileQuery from "../hooks/useProfileQuery";
import useProfileMutation from "../hooks/useProfileMutation";

function Profile({ username }) {
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
    params: { offset: 0, author: username },
  });

  useEffect(() => {
    setFilter({ ...filter, params: { ...filter.params, author: username } });
  }, [username]);

  const { queryResult } = useArticlesQuery(filter, currentUser);
  const articlesList = queryResult.data;

  const articlesCount = articlesList?.articlesCount || null;
  const limit = 10;
  const pages = Math.ceil(articlesCount / limit);

  const handleFollowCLick = async () => {
    if (profile.profile.following === false) {
      fallowUserMutation.mutate();
    } else {
      unfallowUserMutation.mutate();
    }
  };

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
              <p>{profile.profile.bio}</p>
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
                  <Link className="nav-link active" to="">
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/${username}/favorites`}>
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <ArticlesList articlesList={articlesList} user={currentUser} />

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

