import React, { Component } from 'react';
import {Layout } from 'antd';

import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from "../../common/css/common.module.scss";
import AppSearch from '../component/AppSearch';
import AppIncDecTable from "../component/AppIncDecTable";

const { Content } = Layout;


class SearchPage extends Component {

  render() {
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="3" />
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#f8f9fa', padding: 24, height: '100%' }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>
                  <AppSearch></AppSearch>
                </div>
                <div className={commonStyles.card}>
                  <AppIncDecTable></AppIncDecTable>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default SearchPage