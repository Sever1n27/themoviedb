import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Latest, Movie } from "@pages";
import { Header } from "@ui";

export function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/latest/1/" />
        </Route>
        <Route path="/latest/:page/">
          <Latest />
        </Route>
        <Route path="/latest/">
          <Redirect to="/latest/1/" />
        </Route>
        <Route path="/movie/:id/">
          <Movie />
        </Route>
      </Switch>
    </>
  );
}
