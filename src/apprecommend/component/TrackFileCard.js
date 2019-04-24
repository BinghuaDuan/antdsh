import React, { Component } from 'react';
import { message, Button, Modal } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import appRecommendService from '../service/appRecommendService';
import mainDetailStyles from "../../common/css/mainDetail.module.scss";
import appRecommendCardStyles from '../css/appRecommendCard.module.scss';
import TrackFileUploadForm from './TrackFileUpload';

/**
 * props: {
 *   username: String  // required
 * }
 */
class TrackFileCard extends Component {
  state = {
    userTrackInfo: [],
    trackModalVisible: false,
  };

  componentWillReceiveProps = async (nextProps, nextContext) => {
    const username = nextProps.username;

  };

  render() {
    const {
      userTrackInfo,
      trackModalVisible,
    } = this.state;
    const { username } = this.props;
    return (
      <div className={mainDetailStyles.card}>
        <div className={appRecommendCardStyles.detailRelated}>
          <h2>用户轨道</h2>
          <br/>
          <TrackFileUploadForm username={username} />
          <br/>
          <Button onClick={this.handleShowUserTrack}>
            查看用户轨道
          </Button>
          <TrackModal visible={trackModalVisible} userTrackInfo={userTrackInfo} onOk={this.hideTrackModal}></TrackModal>
        </div>
      </div>
    )
  }

  handleShowUserTrack = async () => {
    const { username } = this.props;
    const userTrackInfo = await this.getUserTrackInfo(username);
    if (userTrackInfo && userTrackInfo.length > 0) {
      this.setState({
        userTrackInfo,
        trackModalVisible: true,
      });
    }
    else {
      message.info(`用户未上传轨道文件`);
    }
  };

  hideTrackModal = () => {
    this.setState({ trackModalVisible: false });
  };

  /**
   * 获取userTrackInfo 并转换格式
   * [
   *  {
   *       appname: "百度",
   *       values: "[4, 10, 11]",
   *  },
   * ]
   * =>
   * [
   *  {
   *    appName: "百度",
   *    week1: 4,
   *    week2: 10,
   *    week3: 11
   *  }
   * ]
   * @param username
   * @param weeks
   * @returns {Promise<Array|*>}
   */
  getUserTrackInfo = async (username, weeks=3) => {
    const response = await appRecommendService.getUserTrackInfo(username);
    if (!response.ok) {
      response['oper'] = 'getUserTrackInfo';
      message.error(JSON.stringify(response));
      return [];
    }
    const rawUserTrackInfo = await response.json();
    let userTrackInfo = rawUserTrackInfo.map((val, idx) => {
      let values = JSON.parse(val['values']);
      let obj = { appName: val['appname'] };
      for (let idx in values) {
        if (idx >= weeks) break;
        obj[`week${idx}`] = values[idx];
      }
      return obj;
    });
    return userTrackInfo;
  }
}

class TrackModal extends Component {
  render() {
    const { visible, userTrackInfo, onOk } = this.props;
    const { DataView } = DataSet;
    const data = userTrackInfo;
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["week0", "week1", "week2"], // 展开字段集
      key: "user", // key字段
      value: "score" // value字段
    });
    return (
      <Modal
        visible={visible}
        title={'用户轨道图'}
        okText={'确定'}
        cancelText={'取消'}
        onOk={onOk}
        onCancel={onOk}
      >
        <Chart
          data={dv}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="appName"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Legend name="user" marker="circle" offset={30} />
          <Geom type="area" position="appName*score" color="user" />
          <Geom type="line" position="appName*score" color="user" size={2} />
          <Geom
            type="point"
            position="appName*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </Modal>
    )
  }
}


export default TrackFileCard