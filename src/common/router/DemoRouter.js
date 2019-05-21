import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import KeywordSearchDemoPage from '../page/KeywordSearchDemoPage';
import KeywordSearchPage from '../page/KeywordSearchPage';

class DemoRouter extends Component {
  render() {
    const match = this.props.match
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/KeywordSearch`} component={KeywordSearchPage}></Route>
          <Route path={`${match.path}/KeywordSearchDemo`} component={KeywordSearchDemoPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default DemoRouter