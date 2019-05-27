import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

function Tabs({ match, data }) {

  const username = match.params.username;

  return (
      <div>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <NavLink exact activeClassName="active" to={`/${username}/`} className="nav-link">Overview</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" to={`/${username}/repositories`} className="nav-link">
                    Repositories
                    <span className="py-1 ml-1 badge badge-pill badge-secondary text-white font-weight-lighter">{data.public_repos}</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" to={`/${username}/projects`} className="nav-link">
                    Projects
                    <span className="py-1 ml-1 badge badge-pill badge-secondary text-white font-weight-lighter">0</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" to={`/${username}/stars`} className="nav-link">
                    Stars
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" to={`/${username}/followers`} className="nav-link">
                    Followers
                    <span className="py-1 ml-1 badge badge-pill badge-secondary text-white font-weight-lighter">{data.followers}</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" to={`/${username}/following`} className="nav-link">
                    Following
                    <span className="py-1 ml-1 badge badge-pill badge-secondary text-white font-weight-lighter">{data.following}</span>
                </NavLink>
            </li>
        </ul>
      </div>
  );
}

Tabs.propTypes = {
    match: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
}

export default withRouter(Tabs);
