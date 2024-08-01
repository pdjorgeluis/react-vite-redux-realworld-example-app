import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, updateSettings } from "../reducers/userReducer";
import Notification from "../components/Notifications";

function Settings() {
  const user = useSelector((state) => state.loggedUser.user);
  const [errorMessages, setErrorMessages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedAppUser");
    dispatch(setUser({ user: null }));
    navigate("/");
  };

  const handleUpdateClick = async (event) => {
    event.preventDefault();
    setErrorMessages(null);
    if (event.target.username.value === "") {
      setErrorMessages([`That name is required`]);
      return;
    }
    const newUser = {
      user: {
        email: event.target.email.value,
        password: event.target.password.value,
        username: event.target.username.value,
        bio: event.target.bio.value,
        image: event.target.image.value,
      },
    };
    dispatch(updateSettings(newUser));
    navigate("/");
  };

  return (
    <div className="settings-page">
      {user && (
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <Notification messages={errorMessages} />

              <form onSubmit={handleUpdateClick}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="image"
                      placeholder="URL of profile picture"
                      defaultValue={user.image}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="username"
                      placeholder="Your Name"
                      defaultValue={user.username}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      name="bio"
                      placeholder="Short bio about you"
                      defaultValue={user.bio}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="email"
                      placeholder="Email"
                      defaultValue={user.email}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="password"
                      type="password"
                      placeholder="New Password"
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleLogOut}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
