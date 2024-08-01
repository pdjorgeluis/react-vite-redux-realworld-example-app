import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducers/userReducer";
import Notification from "../components/Notifications";
import userService from "../services/users";
import articlesService from "../services/articles";

function Login() {
  // const user = useSelector((state) => state.loggedUser.user);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    /* if (email === "") {
      setErrorMessages([`email can't be blank`]);
      return;
    }
    if (password === "") {
      setErrorMessages([`password can't be blank`]);
      return;
    } */

    try {
      const userToLogin = await userService.login({
        user: { email, password },
      });
      window.localStorage.setItem("loggedAppUser", JSON.stringify(userToLogin));
      articlesService.setToken(userToLogin.user.token);
      userService.setToken(userToLogin.user.token);
      dispatch(setUser(userToLogin));
      setPassword("");
      navigate("/");
    } catch (exception) {
      setError(exception);
      setPassword("");
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="/register">Need an account?</a>
            </p>

            <Notification error={error} />

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  onChange={({ target }) => setEmail(target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
