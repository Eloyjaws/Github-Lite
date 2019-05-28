import React, { useState, useEffect} from "react";
import SecondaryUser from './SecondaryUser';
import Message from './Message';
import GithubAPI from '../utils/api';


function FollowersList({followers}) {
  return (
    <div>
      {followers.map((user, i) => <SecondaryUser key={i} user={user} />)}
      <hr className="my-4" />
    </div>
  );
}

function Followers({ match }) {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFollowers = () => {
    GithubAPI.getFollowers(match.params.username)
    .then(response => {
      setData(response.data);
      setError('');
    })
    .catch(error => setError(error.response.data.message))
    .then(_ => setLoading(false));
  };

  useEffect(() => {
    fetchFollowers();
    return () => console.log("unsubscribed");
  }, [match.params.username]);

  return (
    <div>
      { loading ? <Message /> : (
        <>
          { error && <Message messageClass="text-danger" message={error} /> }
          { !error && data && <FollowersList followers={data} /> }
          { !error && !data.length && <Message messageClass="text-primary" height="30vh" message={`No followers found for ${match.params.username}`} /> }
        </>
      ) }
    </div>
  );
}

export default Followers;
