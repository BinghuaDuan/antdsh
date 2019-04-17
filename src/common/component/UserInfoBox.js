import React, { Component } from 'react';
import {Layout, Menu, Row, Col, message} from 'antd';
import { Redirect } from 'react-router-dom';

import userService from "../../user/service/userService";
import RESULT from "../constant/Result";
import CODES from "../constant/Codes";

const { Header } = Layout;

/**
 * props: {
 *   defaultSelectedKey: String // required 1, 2  默认选择的菜单
 * }
 */
class UserInfoBox extends Component {

  state = {
    username: "",
    perms: [],
    roles: [],
    redirectToReferrer: false,
    from: "/user/login",
  };

  componentWillMount = async () => {
    const isLoggedIn = await this.isLoggedIn();
    if (!isLoggedIn) window.location = '/user/login';
  };

  render() {
    let from = this.state.from;

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div style={{color: 'white'}}>
        您以 <a onClick={this.handleUserInfo}>{this.state.username}</a> 登录
        (<a onClick={this.logout}>退出</a>)
      </div>
    )
  }

  handleUserInfo = () => {
    const adminRole = 'admin';
    const roles = this.state.roles;
    console.log(roles);
    console.log(roles.includes(adminRole));
    if (roles.includes(adminRole)) {
      // 跳转管理员界面
      this.setState({
        from: '/schema/admin',
        redirectToReferrer: true,
      });
    }
    else {
      // TODO 跳转用户界面
    }
  };

  logout = async () => {
    await userService.logout();
    this.setState({redirectToReferrer: true});
  };

  /**
   * 判断是否登录
   * 若已登录设置state {username, roles, perms}
   * @returns {Promise<boolean>}
   */
  isLoggedIn = async () => {
    const response = await userService.getUserInfo();
    if (!response.ok) {
      message.error(JSON.stringify(response));
      return false;
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      if (results.code === CODES.UNAUTHEN) {
        message.info('用户未登录');
      }
      else {
        message.error(JSON.stringify(results));
      }
      return false
    }
    this.setState({
      username: results.username,
      roles: results.roles,
      perms: results.perms,
    });
    return true;
  };

}

export default UserInfoBox