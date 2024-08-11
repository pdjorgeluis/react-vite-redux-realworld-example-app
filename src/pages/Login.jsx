import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUser } from "../reducers/userReducer";
import Notification from "../components/Notifications";
import userService from "../services/users";
import articlesService from "../services/articles";
import useCurrentUser from "../hooks/useCurrentUser";

function Login() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setNewUser } = useCurrentUser();

  const userMutation = useMutation({
    mutationFn: userService.login,
    onSuccess: (loggedUser) => {
      setNewUser(loggedUser);
      navigate("/");
    },
    onError: (err) => console.log(err),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    userMutation.mutate({
      user: { email, password },
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
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
