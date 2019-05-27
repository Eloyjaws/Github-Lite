import React, { useState, useEffect} from "react";
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faStar, faCircle } from '@fortawesome/free-solid-svg-icons'
import GithubAPI from '../utils/api';
import { getRandomColor } from '../utils/helpers';

function Repo({repo}) {
  return (
    <div>
      <hr className="my-4" />
      <div className="d-flex justify-content-between px-3">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center">
            <h4 className="text-info mb-2"><a href={repo.html_url}>{repo.name}</a></h4>
            {repo.private ? <span style={{fontWeight: 'lighter'}} className="ml-2 badge badge-light">Private</span> : null}
          </div>
          <small>{repo.description}</small>
          <div className="d-flex mt-2">
            {repo.language && <p className="mr-4"><FontAwesomeIcon color={getRandomColor(repo.language)} transform="left-4" icon={faCircle} />{repo.language}</p>}
            {repo.stargazers_count > 0 && <p className="mr-4 pointer"><FontAwesomeIcon color="gold" transform="left-4" icon={faStar} />{repo.stargazers_count}</p>}
            {repo.forks_count > 0 && <p className="mr-4 pointer"><FontAwesomeIcon color="navy" transform="left-4" icon={faCodeBranch} />{repo.forks_count}</p>}
            <p className="text-muted">Updated {moment(repo.updated_at).fromNow()}</p>
          </div>
        </div>
        {/* <div className="d-flex justify-content-center align-items-start">
          <button className="btn btn-secondary">Star</button>
        </div> */}
      </div>
    </div>
  )
}

function RepoList({repos}) {
  const [filteredRepos, setFilteredRepos] = useState(repos);
  const [searchCriteria, setSearchCriteria] = useState('');
  
  const filterRepos = () => {
    if (!searchCriteria) {
      return setFilteredRepos(repos);
    };
    const filtered = filteredRepos.filter(repo => {
      return repo.name.toLowerCase().includes(searchCriteria.toLowerCase()) || 
            repo.full_name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
            (repo.language && repo.language.toLowerCase().includes(searchCriteria.toLowerCase()))
    })
    setFilteredRepos(filtered);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    filterRepos();
  }

  useEffect(()=>filterRepos(), [searchCriteria])
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="d-flex mt-5">
        <input onChange={e => setSearchCriteria(e.target.value)} placeholder="Type to filter repositories" className="form-control mr-2" />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {filteredRepos.map((repo, i) => <Repo key={i} repo={repo} />)}
      <hr className="my-4" />
    </div>
  );
}

function Repositories({ match }) {
  
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

export default Repositories;
