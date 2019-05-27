import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import GithubAPI from '../utils/api';

function SecondaryUser({user}) {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
      GithubAPI.getUserInfo(user.login)
      .then(response => {
        setData(response.data);
        setError('');
      })
      .catch(error => setError(error.response.data.message))
      .then(_ => setLoading(false));
  };

  useEffect(fetchUser, []);


  return (
    <div>
      <hr className="my-4" />
      <div className="d-flex justify-content-start px-3">
        <div className="d-flex justify-content-center align-items-start mr-3">
            <img width={100} src={user.avatar_url + '&s=100'} alt={ user.login + 'Avatar'} />
        </div>
        <div className="d-flex flex-column">
            <div className="d-flex align-items-end mb-2">
                <h6 className="text-info mb-0 mr-2"><a href={user.html_url}>{data && data.name}</a></h6>
                <h6 className="text-info mb-0 font-weight-lighter"><a href={user.html_url}>{user.login}</a></h6>
            </div>
          {data && data.bio && <small>{data.bio}</small>}
          <div className="d-flex mt-2 ml-2">
            {data && data.company && <p className="mr-4 pointer"><FontAwesomeIcon color="grey" transform="left-4" icon={faUserFriends} />{data.company}</p>}
            {data && data.location && <p className="mr-4 pointer"><FontAwesomeIcon transform="left-4" icon={faMapMarkerAlt} />{data.location}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondaryUser;