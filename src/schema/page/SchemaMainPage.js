import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from '../../common/css/common.module.scss';
import SCHEMA_CONST from '../constant/SchemaConstant';
import CommonProductCard from '../../common/component/ProductCard';
import { withRouter } from 'react-router-dom';

const { Content } = Layout;

class SchemaMainPage extends Component {

  render() {
    const listSchemaCardData = {
      href: SCHEMA_CONST.HREF.LIST,
      imgSrc: "/images/menu.png",
      title: "模板列表",
      desc: "查看服务资源模板列表",
    };
    const newSchemaCardData = {
      href: SCHEMA_CONST.HREF.NEW,
      imgSrc: "/images/plus.png",
      title: "新建模板",
      desc: "新建服务资源模板",
    };
    const browserCardData = {
      href: '/demo/keywordsearch',
      title: "服务资源库",
      desc: "检索服务资源库",
    };
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="2" />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>面向异构服务融合的服务资源库</Breadcrumb.Item>
          </Breadcrumb>
          <div className={commonStyles.pageBackground}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>
                  <div className={commonStyles.cardTitle}>面向异构服务融合的服务资源库</div>
                  <div>
                    <CommonProductCard data={newSchemaCardData} />
                    <CommonProductCard data={listSchemaCardData} />
                    <CommonProductCard data={browserCardData} />
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

export default withRouter(SchemaMainPage);