import React from "react";
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import Overview from './Overview';
import Repositories from './Repositories';
import Projects from './Projects';
import Stars from './Stars';
import Followers from './Followers';
import Following from './Following';

import Tabs from './Tabs';

function UserProfile({data }) {
  return (
    <div style={{position: "relative", left: '-16px', maxWidth: '100vw'}} className="w-100 px-4 mt-5 d-flex justify-content-between align-item flex-column flex-md-row">
      <div className="mr-md-5" style={{maxWidth: '320px'}}>
        <img width={300} src={data.avatar_url + '&s=300'} alt={data.login + " Avatar"} />
        <h3 className="mt-2">{data.name}</h3>
        <p>{data.login}</p>
        {data.bio && <p>{data.bio}</p>}
        {data.blog && <a href={data.blog}>{data.blog}</a>}
      </div>
      <div className="flex-grow-1">
        <Tabs data={data} />
        <Switch>
            <Route path='/:username/' exact component={Overview} />
            <Route path='/:username/repositories' component={Repositories} />
            <Route path='/:username/projects' component={Projects} />
            <Route path='/:username/stars' component={Stars} />
            <Route path='/:username/followers' component={Followers} />
            <Route path='/:username/following' component={Following} />
        </Switch>
      </div>
    </div>
  )
}

UserProfile.propTypes = {
  data: PropTypes.object.isRequired
}

export default UserProfile;
