import React, { Component } from 'react';
import {Layout, message} from 'antd';
import { Row, Col } from 'antd';
import NormalRegisterForm from '../component/NormalRegisterForm';
import RESULT from '../../common/constant/Result';
import userService from '../service/userService'
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

class RegisterPage extends Component {

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
                <NormalRegisterForm handleSubmit={this.handleSubmit} />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    )
  }

  handleSubmit = async (username, password) => {
    const response = await userService.register(username, password);
    if (!response.ok) {
      return message.info(JSON.stringify(response));
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      return message.info(JSON.stringify(results));
    }
    message.info('注册成功!');
    await userService.login(username, password);
    this.setState({ redirectToReferrer: true });
  };
}

export default RegisterPage