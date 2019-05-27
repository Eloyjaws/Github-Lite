import React, { useState, useEffect} from "react";
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons'
import GithubAPI from '../utils/api';

function Repo({repo}) {
  return (
    <div>
      <hr className="my-4" />
      <div className="d-flex justify-content-between px-3">
        <div className="d-flex flex-column">
            <h4 className="text-info mb-2"><a href={repo.html_url}>{repo.full_name}</a></h4>
          <small>{repo.description}</small>
          <div className="d-flex mt-2">
            {repo.language && <p className="mr-4">{repo.language}</p>}
            {repo.stargazers_count > 0 && <p className="mr-4 pointer"><FontAwesomeIcon color="gold" transform="left-4" icon={faStar} />{repo.stargazers_count}</p>}
            {repo.forks_count > 0 && <p className="mr-4 pointer"><FontAwesomeIcon color="navy" transform="left-4" icon={faCodeBranch} />{repo.forks_count}</p>}
            <p className="text-muted">Updated {moment(repo.updated_at).fromNow()}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-start w-25">
          <button className="btn btn-secondary text-primary"><FontAwesomeIcon color="black" transform="left-4" icon={faStar} />Star</button>
        </div>
      </div>
    </div>
  )
}

function RepoList({repos}) {
  return (
    <div>
      <h6 className="mt-4 ml-3"><small>REPOSITORIES</small></h6>
      {repos.filter(repo => repo.stargazers_count > 0).map((repo, i) => <Repo key={i} repo={repo} />)}
      <hr className="my-4" />
    </div>
  );
}

function Stars({ match }) {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRepos = () => {
    GithubAPI.getUserRepos(match.params.username)
    .then(response => {
      setData(response.data);
      setError('');
    })
    .catch(error => setError(error.response.data.message))
    .then(_ => setLoading(false));
  };

  useEffect(() => {
    fetchRepos();
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
          {!error && data && ( <RepoList repos={data} /> )}
        </>
      )}
    </div>
  );
}

export default Stars;
