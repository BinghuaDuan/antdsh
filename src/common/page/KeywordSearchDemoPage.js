import React, { Component } from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import commonStyles from '../css/common.module.scss'
import ksStyles from '../css/keywordSearch.module.scss'
import ksService from '../service/ksService'
import { Layout, Breadcrumb } from 'antd';
import MenuHeader from '../component/MenuHeader'

const { Content } = Layout;
const Search = Input.Search;

class ResultItem extends Component {
  renderItem() {
    const data = this.props.data
    const items = []
    for (let key in data) {
      if (key === '名') continue;
      let val = data[key]
      items.push(<div className={ksStyles.attrItem} key={`attrItem-${key}`}>{`${key}: ${val}`}</div>)
    }
    return items
  }
  render() {
    return (
      <div className={ksStyles.resultItem}>
        <div className={ksStyles.attrItem + ' ' + ksStyles.attrFirstItem}>{this.props.data['名'].join(' ')}</div>
        {this.renderItem()}
        {/* <div className={ksStyles.attrMore}>更多>></div> */}
      </div>
    )
  }
}

class ResultList extends Component {
  renderResultItems() {
    return this.props.results.map((x, idx) => <ResultItem data={x} key={`resultitem-${idx}`} ></ResultItem>)
  }
  render() {
    return (
      <div>
        <div className={ksStyles.resultListTop}>
          <dd>
            <Row>
              <Col span={2}>
                <div>默认排序</div>
              </Col>
              <Col span={18}></Col>
              <Col span={4}>
                <div>{`找到${this.props.results.length}个结果`}</div>
              </Col>
            </Row>
          </dd>
        </div>
        <div className={ksStyles.resultList}>
          {this.renderResultItems()}
        </div>
      </div>
    )
  }
}

class KeywordSearchDemoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
    }
  }
  async searchHandler(query) {
    this.setState({results: []})
    if (query.trim() === '') return;
    const res = await ksService.keywordSearch(query);
    if (!res.ok) {
      console.log(res)
      return;
    }
    const results = await res.json()
    this.setState({results})
  }
  render() {
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader></MenuHeader>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>试用</Breadcrumb.Item>
            <Breadcrumb.Item>关键字搜索</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#f8f9fa', padding: 24 }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>  
                  <Search
                    placeholder="input search text"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.searchHandler.bind(this)}
                  ></Search>
                </div>
                <div className={commonStyles.card}>
                  <ResultList results={this.state.results}></ResultList>
                </div>
              </div>
            </div> 
          </div>
        </Content>
      </Layout>
      
    )
  }
}

export default KeywordSearchDemoPage
