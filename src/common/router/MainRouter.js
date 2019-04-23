import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import MainHomePage from '../page/MainHomePage';
import MainDetailPage from '../page/MainDetailPage';


class MainRouter extends Component {
  render() {
    const match = this.props.match
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/`} exact component={MainHomePage}></Route>
          <Route path={`${match.path}/home`} component={MainHomePage}></Route>
          <Route path={`${match.path}/detail/:id`} component={MainDetailPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default MainRouter