import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Navbar from "./components/Navbar.js";
import User from "./pages/User";
import Home from "./pages/Home";

import "./App.css";

const SearchInputContext = React.createContext();

function AppRouter() {
  const searchInputFocus = useState(false);
  return (
    <SearchInputContext.Provider value={searchInputFocus}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/:username' component={User} />
            <Route render={() => (
              <>
                <h1 className='text-center text-info mt-5'>Error 404 - Page Not Found</h1>
                <p className="text-center"><Link to="/">Go home</Link></p>
              </ >
            )} />
          </Switch>
        </div>
      </Router>
    </SearchInputContext.Provider>
  );
}

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export { SearchInputContext };
export default App;
