import React, { useState, useEffect } from "react";
import GithubAPI from "../utils/api";
import UserProfile from "../components/UserProfile";

function User({ match }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
      GithubAPI.getUserInfo(match.params.username)
      .then(response => {
        setData(response.data);
        setError('');
      })
      .catch(error => setError(error.response.data.message))
      .then(_ => setLoading(false));
  };

  useEffect(() => {
    fetchUser();
    return () => console.log("unsubscribed");
  }, [match.params.username]);

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
        {loading ? (
          <h4 className="text-success">Loading ... </h4>
        ) : (
          <>
            {error && <h4 className="text-danger">{error}</h4>}
            {!error && data && ( <UserProfile data={data} /> )}
          </>
        )}
      </div>
    </div>
  );
}

export default User;
