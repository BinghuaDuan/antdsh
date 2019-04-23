import React, { Component } from 'react';
import {Layout, message, Row, Col } from 'antd';
import querystring from "querystring";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";


import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from "../../common/css/common.module.scss";
import mainDetailStyles from "../../common/css/mainDetail.module.scss";
import appRecommendService from "../service/appRecommendService";


const { Content } = Layout;

/**
 * props: {
 *   appName: String  // required
 * }
 */
class PopularityChart extends Component {
  state = {
    appPopularityData: null,
  };

  componentWillReceiveProps = async (nextProps, nextContext) => {
    const appName = nextProps.appName;
    if (appName === null) return;
    const appPopularityData = await this.fetchAppPopularityData(appName);
    this.setState({ appPopularityData });
  };

  render() {
    if (this.state.appPopularityData === null) {
      return <div></div>
    }
    const data = this.state.appPopularityData;
    const cols = {
      popularity: {
        alias: '欢迎度',
        min: 0
      },
      crawltime: {
        alias: '日期',
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="crawltime" />
          <Axis name="popularity" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position="crawltime*popularity" size={2} />
          <Geom
            type="point"
            position="crawltime*popularity"
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }

  fetchAppPopularityData = async (appName) => {
    const response = await appRecommendService.getAppPopularity(appName);
    if (!response.ok) {
      message.error(JSON.stringify(response));
      return null;
    }
    const data = await response.json();
    if (data.length === 0) return null;
    for (let item of data) {
      item['popularity'] = item['download'] * item['likerate'];
    }
    console.log('originData: ', data);
    console.log('parseData: ', this.genPopularityData(data));
    return this.genPopularityData(data);
  };

  /**
   * 只给最近一天的，随机生成前六天的数据
   * @param data
   * @returns {Promise<void>}
   */
  genPopularityData = (data) => {
    const rate = 0.2;
    const currData = data[0];
    const currDate = new Date(currData['crawltime']);
    const currPopularity = currData['popularity'];
    const resData = [];
    for (let idx = 6; idx >= 0; idx--) {
      let newDate = new Date(currDate - 1000*60*60*24*idx);
      let newPopularity = Math.floor(currPopularity + (Math.random() - 0.5) * currPopularity * rate);
      resData.push({
        'crawltime': `${newDate.getFullYear()}-${newDate.getUTCMonth() + 1}-${newDate.getUTCDate()}`,
        'popularity': newPopularity,
      });
    }
    return resData;
  };

}


/**
 * props: {
 *   functionInfoData: Array  // required [{updateversion: String, updatefunction: String}]
 * }
 */
class FunctionInfoChart extends Component {
  render() {
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    const functionInfoData = this.props.functionInfoData;
    const updateVersion = functionInfoData[0]['updateversion'];
    const versionHtml = `<div>${updateVersion}</div>`

    const data = functionInfoData;
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "updatefunction",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => " "
      }
    };

    return (
      <div>
        <Chart
          height={300}
          data={dv}
          scale={cols}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html={versionHtml}
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="updatefunction"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.updatefunction + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
  }
}


/**
 * props: {
 *   appName: String  // required
 * }
 */
class FunctionInfoCard extends Component {
  state = {
    appFunctionInfoData: null,
  };

  componentWillReceiveProps = async (nextProps, currContext) => {
    const appName = nextProps.appName;
    if (appName === null) return;
    let appFunctionInfoData = await this.fetchAppFunctionInfoData(appName);
    if (appFunctionInfoData) {
      appFunctionInfoData = this.parseFunctionInfoData(appFunctionInfoData);
    }
    this.setState({ appFunctionInfoData });
  };

  render() {
    if (this.state.appFunctionInfoData === null) {
      return <div></div>
    }
    return (
      <div>
        <Row>
          {this.renderFunctionInfoCharts(this.state.appFunctionInfoData)}
        </Row>
      </div>
    )
  }

  renderFunctionInfoCharts(dataArr) {
    return dataArr.map((val, idx) => {
      return (
        <Col sm={24} md={12} lg={8} xl={6} key={`functionInfoChartCol${idx}`}>
          <FunctionInfoChart functionInfoData={val} />
        </Col>
      )
    })
  }

  /**
   * 转换appFunctionInfoData 数据格式
   * 假设相同时间对应相同版本 1：1
   * 使用时间排序，按照版本分组
   * [
   *  {
   *    updateversion: xxx,
   *    updatetime: yyy,
   *    updatefunction: zzz,
   *  },
   *  ...
   * ]
   * =>
   * {
   *   [updatetime]: [
   *     {
   *       updateversion: xxx,
   *       updatefunction: zzz,
   *     }
   *   ],
   *   ...
   * }
   * => (sort by time)
   * [
   *    [
   *      {
   *        updateversion: xxx,
   *        updatefunction: zzz,
   *      },
   *      ...
   *    ],
   *    [...],
   *    ...
   * ]
   * @param appFunctionInfoData
   */
  parseFunctionInfoData = (appFunctionInfoData) => {
    let resObj = {};
    for (let item of appFunctionInfoData) {
      const updateTime = item['updatetime'];
      const updateVersion = item['updateversion'];
      const updateFunctions = item['updatefunction'].split(',');
      resObj[updateTime] = [];
      for (let func of updateFunctions) {
        resObj[updateTime].push({
          updateversion: updateVersion,
          updatefunction: func,
          count: 1, // 用于饼图计算百分比，使用相同比重
        });
      }
    }
    let resArr = [];
    for (let key in resObj) {
      let item = resObj[key];
      resArr.push(item);
    }
    resArr.sort((a, b) => {
      const dateA = new Date(a[0]['updatetime']);
      const dateB = new Date(b[0]['updatetime']);
      return dateB - dateA;
    });
    return resArr;
  };

  fetchAppFunctionInfoData = async (appName) => {
    const response = await appRecommendService.getAppFunctionInfo(appName);
    if (!response.ok) {
      message.error(JSON.stringify(response));
      return null;
    }
    const data = await response.json();
    if (data.length === 0) return null;
    return data;
  };
}


class AppInfoPage extends Component {

  state = {
    appName: null,
    appInfoData: null,
  };

  componentWillMount = async () => {
    let appName = this.getQuery()['appName'];
    if (appName !== undefined) {
      appName = appName.trim();
      const appInfoData = await this.fetchAppInfoData(appName);
      this.setState({ appName, appInfoData });
    }
  };

  render() {
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="3" />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#f0f2f5', padding: 24, height: '100%' }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card + ' ' + mainDetailStyles.card}>
                  {this.renderHeader(this.state.appInfoData)}
                </div>
                <div className={commonStyles.cardTitle}>欢迎度变化</div>
                <div className={commonStyles.card + ' ' + mainDetailStyles.card}>
                  <PopularityChart appName={this.state.appName}></PopularityChart>
                </div>
                <div className={commonStyles.cardTitle}>功能变化</div>
                <div className={commonStyles.card + ' ' + mainDetailStyles.card}>
                  <FunctionInfoCard appName={this.state.appName}></FunctionInfoCard>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }

  fetchAppInfoData = async (appName) => {
    const response = await appRecommendService.getAppInfo(appName);
    if (!response.ok) {
      message.error(JSON.stringify(response));
      return null;
    }
    const data = await response.json();
    if (data.length === 0) return null;
    return data[0];
  };

  getQuery = () => {
    let search = this.props.location.search;
    if (search === "") {
      message.info('模板名未指定');
      return;
    }
    search = search.split('?')[1];
    return querystring.parse(search);
  };

  renderHeader(detailData) {
    if (detailData) {
      return (
        <div className={mainDetailStyles.detailHeader}>
          <div className={mainDetailStyles.detailHeaderImg}>
            <img src={detailData.imageurl} alt={detailData.appname}></img>
          </div>
          <div className={mainDetailStyles.detailHeaderText}>
            <h1>{detailData.appname}</h1>
            <p>{detailData.introduction}</p>
          </div>
        </div>
      )
    }
  }
}

export default AppInfoPage