import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from "../../common/css/common.module.scss";
import AppSearch from '../component/AppSearch';
import AppIncDecTable from "../component/AppIncDecTable";
import mainDetailStyles from "../../common/css/mainDetail.module.scss";
import AppRecommendCard from '../component/AppRecommendCard';

const { Content } = Layout;


class SearchPage extends Component {

  render() {
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="3" />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#f0f2f5', padding: 24, height: '100%' }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <Row gutter={16}>
                  <Col md={24} xl={16}>
                    <div className={commonStyles.card + ' ' + mainDetailStyles.card}>
                      <AppSearch></AppSearch>
                    </div>
                    <div className={commonStyles.card + ' ' + mainDetailStyles.card}>
                      <AppIncDecTable></AppIncDecTable>
                    </div>
                  </Col>
                  <Col md={24} xl={8}>
                    <AppRecommendCard></AppRecommendCard>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default SearchPage