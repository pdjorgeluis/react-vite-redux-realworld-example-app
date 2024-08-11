import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUser } from "../reducers/userReducer";
import Notification from "../components/Notifications";
import userService from "../services/users";
import articlesService from "../services/articles";
import useCurrentUser from "../hooks/useCurrentUser";

function Register() {
  const [error, setError] = useState(null);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setNewUser } = useCurrentUser();

  const userMutation = useMutation({
    mutationFn: userService.register,
    onSuccess: (loggedUser) => {
      console.log(loggedUser);

      setNewUser(loggedUser);
      navigate("/");
    },
    onError: (err) => console.log(err),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      userMutation.mutate({
        user: {
          username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
        },
      });
      /*
      const userToregister = await userService.register({
        user: {
          username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
        },
      });
      // Loggin user after registration
      window.localStorage.setItem(
        "loggedAppUser",
        JSON.stringify(userToregister)
      );
      

      articlesService.setToken(userToregister.user.token);
      userService.setToken(userToregister.user.token);
      dispatch(setUser(userToregister));
      navigate("/"); */
    } catch (exception) {
      setError(exception);
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <Notification error={error} />

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
