import * as React from 'react';
import Routes from './routes';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export interface IAPPProps {}

export default function APP(props: IAPPProps) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Routes} />
      </Switch>
    </Router>
  );
}
