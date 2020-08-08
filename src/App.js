import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchLocation from './views/SearchLocation';
import PageNotFound from './views/PageNotFound';

import Weather from './views/Weather';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Twoja pogoda</h1>
        <Switch>
          <Route exact path="/">
            <SearchLocation />
          </Route>
          <Route path="/404">
            <SearchLocation />
            <PageNotFound />
          </Route>
          <Route path="/:selectedCity">
            <SearchLocation />
            <Weather />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
