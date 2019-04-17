import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import SchemaMainPage from '../page/SchemaMainPage';
import SchemaListPage from '../page/SchemaListPage';
import NewSchemaPage from '../page/NewSchemaPage';
import EditSchemaPage from '../page/EditSchemaPage';
import ViewSchemaPage from '../page/ViewSchemaPage';
import AdminSchemaMainPage from '../page/AdminSchemaMainPage';
import AdminSchemaListPage from '../page/AdminSchemaListPage';
import AdminSchemaVerifyPage from '../page/AdminSchemaVerifyPage';

import { withRouter } from 'react-router-dom';

class SchemaRouter extends Component {
  render() {
    const match = this.props.match;
    return (
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path={`${match.path}/`} exact component={SchemaMainPage} ></Route>
          <Route path={`${match.path}/list`} component={SchemaListPage} ></Route>
          <Route path={`${match.path}/new`} component={NewSchemaPage} ></Route>
          <Route path={`${match.path}/edit`} component={EditSchemaPage} ></Route>
          <Route path={`${match.path}/view`} component={ViewSchemaPage} ></Route>
          <Route path={`${match.path}/admin/`} exact component={AdminSchemaMainPage} ></Route>
          <Route path={`${match.path}/admin/list`} component={AdminSchemaListPage} ></Route>
          <Route path={`${match.path}/admin/verify`} component={AdminSchemaVerifyPage} ></Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(SchemaRouter)