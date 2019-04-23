import React, { Component } from 'react';
import { Table, message, Row, Col } from 'antd';

import appRecommendService from '../service/appRecommendService';
import RESULT from "../../common/constant/Result";


const getColumns = (title) => {
  return [
    {
      title,
      dataIndex: 'appname',
      key: 'appname',
      render: text => <a href={`/app/info?appName=${text}`}>{text}</a>
    }
  ]
};


class AppIncDecTable extends Component {
  state = {
    incInfo: [],
    decInfo: [],
    incDecUpdateTime: '',
  };

  componentWillMount() {
    this.setIncDecInfo();
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <Table columns={getColumns('新增App')} dataSource={this.state.incInfo} />
        </Col>
        <Col span={12}>
          <Table columns={getColumns('退出App')} dataSource={this.state.decInfo} />
        </Col>
      </Row>
    )
  }

  setIncDecInfo = async () => {
    const response = await appRecommendService.getIncdecInfo();
    console.log(response);
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

export default AppIncDecTable