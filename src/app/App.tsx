import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import BusinessDetails from "./../components/BusinessDetails/BusinessDetails";
import BusinessesList from "./../components/BusinessesList/BusinessesList";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.App}>
      <Switch>
        <Route exact path='/' component={BusinessesList} />
        <Route exact path='/:id' component={BusinessDetails} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
