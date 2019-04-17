import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DemoRouter from './DemoRouter';
import MainRouter from './MainRouter';
import UserRouter from '../../user/router/UserRouter';
import SchemaRouter from '../../schema/router/SchemaRouter';

const links = () => {
  return (
    <div>
      <li>
        <Link to="/demo/KeywordSearch">KeywordSearch</Link>
      </li>
      <li>
        <Link to="/main/home">main home</Link>
      </li>
      <li>
        <Link to="/main/detail">main detail</Link>
      </li>
      <li>
        <Link to="/user/login">user login</Link>
      </li>
    </div>
  )
  ;
}

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div style={{ height: "100%" }}>
          <Switch>
            <Route path="/" exact component={links} />
            <Route path="/demo" component={DemoRouter} />
            <Route path="/main" component={MainRouter} />
            <Route path="/user" component={UserRouter} />
            <Route path="/schema" component={SchemaRouter} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppRouter