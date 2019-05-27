import React, { useContext } from 'react';
import { SearchInputContext } from '../App';

export default function Home() {
    const [, setIsSearchInputFocused] = useContext(SearchInputContext);
    return (
      <div className="container mt-5">
        <div className="jumbotron">
            <h1 className="display-3">Hello!</h1>
            <p className="lead">Welcome to GitHub-lite, a simple react app for looking up github users information.</p>
            <hr className="my-4" />
            <p>You can run a search for your favorite github star using the form in the navbar.</p>
            <p className="lead">
                <button onClick={() => setIsSearchInputFocused(true)} className="btn btn-info btn-lg">Click here to Search</button>
            </p>
        </div>
      </div>
    );
  }