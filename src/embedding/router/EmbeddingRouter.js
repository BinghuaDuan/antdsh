import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import EmbeddingListPage from "../page/EmbeddingListPage";

class SchemaRouter extends Component {
  render() {
    const match = this.props.match;
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/`} exact component={EmbeddingListPage} ></Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(SchemaRouter)