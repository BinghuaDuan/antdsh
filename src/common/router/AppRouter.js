import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DemoRouter from './DemoRouter';
import MainRouter from './MainRouter';
import UserRouter from '../../user/router/UserRouter';
import SchemaRouter from '../../schema/router/SchemaRouter';
import AppRecommendRouter from '../../apprecommend/router/AppRecommendRouter';
import MultiviewRouter from '../../multiview/router/MultiviewRouter';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div style={{ height: "100%" }}>
          <Switch>
            <Route path="/" exact component={MainRouter} />
            <Route path="/demo" component={DemoRouter} />
            <Route path="/main" component={MainRouter} />
            <Route path="/user" component={UserRouter} />
            <Route path="/schema" component={SchemaRouter} />
            <Route path="/app" component={AppRecommendRouter} />
            <Route path="/multiview" component={MultiviewRouter} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppRouter