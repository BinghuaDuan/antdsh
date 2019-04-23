import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from '../../common/css/common.module.scss';
import SCHEMA_CONST from '../constant/SchemaConstant';
import CommonProductCard from '../../common/component/ProductCard';
import { withRouter } from 'react-router-dom';

const { Content } = Layout;

class AdminSchemaMainPage extends Component {

  render() {
    const listSchemaCardData = {
      href: SCHEMA_CONST.HREF.ADMIN_LIST,
      imgSrc: "/images/menu.png",
      title: "管理",
      desc: "模板管理",
    };
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="2" />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>模板</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#f8f9fa', padding: 24, height: '100%' }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>
                  <div className={commonStyles.cardTitle}>模板</div>
                  <div>
                    <CommonProductCard data={listSchemaCardData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>

      </Layout>
    )
  }
}

export default withRouter(AdminSchemaMainPage);