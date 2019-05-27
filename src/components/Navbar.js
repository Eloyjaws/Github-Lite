import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

import { SearchInputContext } from '../App';

function Navbar({ history }) {

  const inputEl = useRef(null);

  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => setShowNav(!showNav);

  const [username, setUsername] = useState("");

  const [isSearchInputFocused, setIsSearchInputFocused] = useContext(SearchInputContext);


  const handleSearchInputFocus = () => {
    inputEl.current.focus();
    setShowNav(true);
    if(!isSearchInputFocused) {
      inputEl.current.blur();
      setShowNav(false)
    }
  }

  useEffect(handleSearchInputFocus, [isSearchInputFocused]);

  const handleInput = e => {
    setUsername(e.target.value);
  };

  const cleanup = () => {
    setUsername('');
    setShowNav(false);
    setIsSearchInputFocused(false);
  }

  const handleSubmitForm = e => {
    e.preventDefault();
    history.push(`/${username}`);
    cleanup();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand text-white" to="/">Github-Lite</Link>
      <button onClick={toggleNav} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={" justify-content-end collapse navbar-collapse" + (showNav ? " show" : "")} id="navbarColor03">
        <form onSubmit={handleSubmitForm} className="form-inline justify-content-end my-2 my-lg-0">
          <input
            onChange={handleInput}
            onBlur={() => setIsSearchInputFocused(false)}
            value={username}
            ref={inputEl}
            placeholder="Enter Username ..."
            className="form-control"
            autoComplete="off"
            type="text"
            id="username"
          />
          <button className="btn btn-info ml-md-2 my-2 my-sm-0" disabled={!username} type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(Navbar);
