import React, { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faStar, faCircle } from '@fortawesome/free-solid-svg-icons'
import GithubAPI from '../utils/api';
import Message from './Message';
import { getRandomColor } from '../utils/helpers';

function Repo({repo}) {
  return (
    <div className="card border-primary mb-3 mr-3 repo__card">
      <div className="card-body">
        <h6 className="card-title"><a href={repo.html_url}>{repo.name}</a></h6>
        <p className="card-text"><small>{repo.description}</small></p>
        <div className="d-flex mt-2">
          {repo.language && <p className="mr-4"><FontAwesomeIcon color={getRandomColor(repo.language)} transform="left-2" icon={faCircle} />{repo.language}</p>}
          {repo.stargazers_count > 0 && <p className="mr-4 pointer"><FontAwesomeIcon color="gold" transform="left-4" icon={faStar} />{repo.stargazers_count}</p>}
          {repo.forks_count > 0 && <p className="mr-4 pointer"><FontAwesomeIcon color="navy" transform="left-4" icon={faCodeBranch} />{repo.forks_count}</p>}
        </div>
      </div>
    </div>
  )
}

function RepoList({repos}) {
  return (
    <div className="d-flex flex-wrap">
      <h6 className="mt-5 w-100">Pinned</h6>
      {repos.map((repo, i) => <Repo key={i} repo={repo} />)}
    </div>
  );
}

function Overview({ match }) {
  
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
      { loading ? <Message /> : (
        <>
          { error && <Message messageClass="text-danger" message={error} /> }
          { !error && data && <RepoList repos={data} /> }
          { !error && !data.length && <Message messageClass="text-primary" height="30vh" message={`${match.params.username} does not have any public Repos`} /> }
        </>
      ) }
    </div>
  );
}

export default Overview;
