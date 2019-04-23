import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import SearchPage from '../page/SearchPage';
import AppInfoPage from '../page/AppInfoPage';
import APP_RECOMMEND_CONST from '../constant/AppRecommendConst';


class AppRecommendRouter extends Component {
  render() {
    const match = this.props.match
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}${APP_RECOMMEND_CONST.HREF.SEARCH}`} component={SearchPage}></Route>
          <Route path={`${match.path}${APP_RECOMMEND_CONST.HREF.INFO}`} component={AppInfoPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default AppRecommendRouter