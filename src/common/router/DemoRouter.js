import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import KeywordSearchDemoPage from '../page/KeywordSearchDemoPage'

class DemoRouter extends Component {
  render() {
    const match = this.props.match
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/KeywordSearch`} component={KeywordSearchDemoPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default DemoRouter