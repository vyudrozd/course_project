import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MapPage from './pages/index';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <MapPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
