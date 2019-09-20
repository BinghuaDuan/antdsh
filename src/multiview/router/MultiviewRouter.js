import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import ViewConfigPage from '../page/ViewConfig';

import { withRouter } from 'react-router-dom';

class SchemaRouter extends Component {
  render() {
    const match = this.props.match;
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/`} exact component={ViewConfigPage} ></Route>
          <Route path={`${match.path}/config`} component={ViewConfigPage} ></Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(SchemaRouter)