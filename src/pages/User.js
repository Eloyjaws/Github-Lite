import React, { useState, useEffect } from "react";
import GithubAPI from "../utils/api";
import UserProfile from "../components/UserProfile";
import Message from '../components/Message';

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
      { loading ? <Message height="80vh" /> : (
        <>
          { error && <Message messageClass="text-danger" message={error} /> }
          { !error && data && <UserProfile data={data} /> }
        </>
      ) }
    </div>
  );
}

export default User;
