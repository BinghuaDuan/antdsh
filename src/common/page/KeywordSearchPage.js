import React, { Component } from 'react';
import { Layout, Breadcrumb, message, Input } from 'antd';
import commonStyles from '../css/common.module.scss'
import MenuHeader from '../component/MenuHeader';
import APP_CONFIG from '../../appconfig';

const { Content } = Layout;
const { Search } = Input;


class KeywordSearchPage extends Component {

  state = {
    queryUri: "",
  };

  setQueryUri = (value) => {
    let queryUri = `match (n)-[r]-(m) where n.name =~ '.*${value}.*' return n,m limit 25;`;
    this.setState({ queryUri });
  };

  render() {
    const { queryUri } = this.state;
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader></MenuHeader>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>关键词搜索</Breadcrumb.Item>
          </Breadcrumb>
          <div className={commonStyles.pageBackground}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <Search
                  onSearch={this.setQueryUri}
                  enterButton="搜索"
                  size={"large"}
                />
                <br/>
                {
                  queryUri == "" ?
                    <div></div> :
                    <iframe
                      style={{
                        width: '100%',
                        height: '600px',
                      }}
                      scrolling={'no'}
                      frameBorder={'0'}
                      src={`${APP_CONFIG.neo4jBrowserUrl}/NeoEmbed.html?query=${encodeURIComponent(queryUri).replace(/=/g, '%3d')}`} ></iframe>
                }
              </div>
            </div>
          </div>
        </Content>

      </Layout>
    )
  }
}

export default KeywordSearchPage