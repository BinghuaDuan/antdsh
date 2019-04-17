import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';

import LoginChecker from "./LoginChecker";
import UserInfoBox from './UserInfoBox';

const { Header } = Layout;

/**
 * props: {
 *   defaultSelectedKey: String // required 1, 2  默认选择的菜单
 * }
 */
class MenuHeader extends Component {

  render() {
    const defaultSelectedKey = this.props.defaultSelectedKey || '1';
    return (
      <Header>
        <Row>
          <Col span={20}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[defaultSelectedKey]}
              style={{ lineHeight: '64px' }}
              onClick={this.handleClickMenu}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">模板</Menu.Item>
            </Menu>
          </Col>
          <Col span={4}>
            <UserInfoBox></UserInfoBox>
          </Col>
        </Row>


      </Header>
    )
  }

  handleClickMenu = (e) => {
    const key = e.key;
    if (key === '1') {
      window.location = '/main/home';
    }
    if (key === '2') {
      window.location = '/schema';
    }
  };
}

export default MenuHeader