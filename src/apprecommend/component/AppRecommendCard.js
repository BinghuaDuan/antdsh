import React, { Component } from 'react';
import { message } from 'antd';

import appRecommendService from '../service/appRecommendService';
import userService from '../../user/service/userService';
import mainDetailStyles from "../../common/css/mainDetail.module.scss";
import RESULTS from '../../common/constant/Result';
import appRecommendCardStyles from '../css/appRecommendCard.module.scss';

class AppRecommendCard extends Component {
  state = {
    username: null,
    recommendAppList: [],
    recommendAppInfoList: [],
  };

  componentWillMount = async () => {
    const username = await this.getUsername();
    const recommendAppList = await this.getRecommendApps(username);
    const recommendAppInfoList = await Promise.all(recommendAppList.map((val, idx) => this.getAppInfo(val)));
    this.setState({ username, recommendAppList, recommendAppInfoList });
  };

  render() {
    return (
      <div className={mainDetailStyles.card}>
        <div className={appRecommendCardStyles.detailRelated}>
          <h2>推荐App</h2>
          {this.renderRecommendApps()}
        </div>
      </div>
    )
  }

  renderRecommendApps() {
    const apps = this.state.recommendAppInfoList;
    if (apps && apps.length > 0) {
      return apps.map((val, idx) => {
        return (
          <div key={`relatedProduct-${idx}`}>
            <div className={appRecommendCardStyles.detailRelatedItem}>
              <div className={appRecommendCardStyles.detailRelatedImg}>
                <img src={val.imageurl} alt={val.appname}></img>
              </div>
              <div className={appRecommendCardStyles.detailRelatedText}>
                <h3>
                  <a href={`/app/info?appName=${val.appname}`}>{val.appname}</a>
                </h3>
                <p>{val.introduction}</p>
              </div>
            </div>
          </div>
        )
      })
    }
  }

  getAppInfo = async (appName) => {
    const response = await appRecommendService.getAppInfo(appName);
    if (!response.ok) {
      return message.error(JSON.stringify(response));
    }
    const data = await response.json();
    return data[0];
  };

  getRecommendApps = async (username) => {
    const response = await appRecommendService.getRecommendApps(username);
    if (!response.ok) {
      message.error(JSON.stringify(response));
      return [];
    }
    const results = await response.json();
    if (!results.ok) {
      message.info(JSON.stringify(results));
      return [];
    }
    return JSON.parse(results['likeapp']);
  };

  getUsername = async () => {
    const response = await userService.getUserInfo();
    if (!response.ok) {
      message.error(JSON.stringify(response));
      return null;
    }
    const results = await response.json();
    if (results.code !== RESULTS.DEFAULT_SUCC_CODE) {
      message.info(JSON.stringify(results));
      return null;
    }
    return results.username;
  };

  setIncDecInfo = async () => {
    const response = await appRecommendService.getIncdecInfo();
    if (!response.ok) {
      return message.error(JSON.stringify(response));
    }
    const data = await response.json();
    if (data.length === 0) {
      return;
    }
    let incDecUpdateTime = null;
    let incInfo = [];
    let decInfo = [];
    for (let item of data) {
      incDecUpdateTime = item['crawltime'];
      if (item['incdectype'] === '+') {
        incInfo.push(item);
      }
      else if (item['incdectype'] === '-') {
        decInfo.push(item);
      }
      else {
        console.error('setIncDecInfo item is not in [-, +]: ' + JSON.stringify(item));
      }
    }
    this.setState({ incDecUpdateTime, incInfo, decInfo });
  };

}

export default AppRecommendCard