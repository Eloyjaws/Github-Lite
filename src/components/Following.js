import React, { useState, useEffect} from "react";
import SecondaryUser from './SecondaryUser';
import Message from './Message';
import GithubAPI from '../utils/api';


function FollowingList({following}) {
  return (
    <div>
      {following.map((user, i) => <SecondaryUser key={i} user={user} />)}
      <hr className="my-4" />
    </div>
  );
}

function Following({ match }) {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFollowing = () => {
    GithubAPI.getFollowing(match.params.username)
    .then(response => {
      setData(response.data);
      setError('');
    })
    .catch(error => setError(error.response.data.message))
    .then(_ => setLoading(false));
  };

  useEffect(() => {
    fetchFollowing();
    return () => console.log("unsubscribed");
  }, [match.params.username]);

  return (
    <div>
      { loading ? <Message /> : (
        <>
          { error && <Message messageClass="text-danger" message={error} /> }
          { !error && data && <FollowingList following={data} /> }
          { !error && !data.length && <Message messageClass="text-primary" height="30vh" message={`${match.params.username} is not following anyone`} /> }
        </>
      ) }
    </div>
  );
}

export default Following;
