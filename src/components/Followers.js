import React, { useState, useEffect} from "react";
import SecondaryUser from './SecondaryUser';
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
      {loading ? (
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
          <h4 className="text-success">Loading ... </h4>
        </div>
      ) : (
        <>
          {error && 
            <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
              <h4 className="text-danger">{error}</h4>
            </div>
          }
          {!error && data && ( <FollowersList followers={data} /> )}
        </>
      )}
    </div>
  );
}

export default Followers;
