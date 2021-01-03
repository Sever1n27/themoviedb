import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Movie } from "@pages";

export function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/movie/:id/">
        <Movie />
      </Route>
    </Switch>
  );
}
