import React, { Component } from 'react';
import {Input, message} from 'antd';

import appRecommendService from '../service/appRecommendService';
import RESULT from "../../common/constant/Result";

const { Search } = Input;

class AppSearch extends Component {

  render() {
    return (
      <Search
        size={"large"}
        placeholder="请输入App 名"
        onSearch={this.handleSearch}
        enterButton
      />
    )
  }

  handleSearch = async (value) => {
    const appName = value.trim();
    const response = await appRecommendService.getAppInfo(appName);
    if (!response.ok) {
      return message.error(JSON.stringify(response));
    }
    const data = await response.json();
    if (data.length > 0) {
      window.location = `/app/info?appName=${appName}`;
    }
    else {
      message.info(`app ${appName} 不存在`);
    }
  }
}

export default AppSearch