import React from "react";
import { Link } from "react-router-dom";

function Header({ user }) {
  return !user ? (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/editor">
              <i className="ion-compose"> </i>&nbsp;New Article
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              <i className="ion-gear-a"> </i>&nbsp;Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/@${user.username}`} className="nav-link">
              <img src={user.image} className="user-pic" alt={user.username} />
              {user.username}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
