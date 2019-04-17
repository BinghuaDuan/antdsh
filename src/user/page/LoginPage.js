import React, { Component } from 'react';
import {Layout, message, Row, Col } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';

import NormalLoginForm from '../component/NormalLoginForm';
import RESULT from '../../common/constant/Result';
import userService from '../service/userService'

const { Content } = Layout;

class LoginPage extends Component {

  state = {
    redirectToReferrer: false,
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/main/home" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ marginTop: '50px' }}>
            <Row>
              <Col span={6} offset={9}>
                  <NormalLoginForm
                    handleSubmit={this.handleLogin}
                    registerHref = '/user/register'
                  />
              </Col>
            </Row>
          </div>
        </Content>

      </Layout>
    )
  }

  handleLogin = async (username, password) => {
    const response = await userService.login(username, password);
    if (!response.ok) {
      return message.info(JSON.stringify(response));
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      return message.info(JSON.stringify(results));
    }
    this.setState({ redirectToReferrer: true });
  };
}

export default withRouter(LoginPage)