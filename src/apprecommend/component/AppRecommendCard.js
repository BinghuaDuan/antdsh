import React, { Component } from 'react';
import { message } from 'antd';

import appRecommendService from '../service/appRecommendService';
import mainDetailStyles from "../../common/css/mainDetail.module.scss";
import appRecommendCardStyles from '../css/appRecommendCard.module.scss';

/**
 * props: {
 *   username: String  // required
 * }
 */
class AppRecommendCard extends Component {
  state = {
    recommendAppList: [],
    recommendAppInfoList: [],
  };

  componentWillReceiveProps = async (nextProps, nextContext) => {
    const username = nextProps.username;
    if (username) {
      const recommendAppList = await this.getRecommendApps(username);
      const recommendAppInfoList = await Promise.all(recommendAppList.map((val, idx) => this.getAppInfo(val)));
      this.setState({ recommendAppList, recommendAppInfoList });
    }
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

}

export default AppRecommendCard