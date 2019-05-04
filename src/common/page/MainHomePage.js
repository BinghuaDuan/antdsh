import React, { Component } from 'react';
import { Layout, Breadcrumb, message } from 'antd';
import { Row } from 'antd';
import commonStyles from '../css/common.module.scss'
import MenuHeader from '../component/MenuHeader';
import mainPageService from '../service/mainPageService';
import CommonProductCard from '../component/ProductCard';


const { Content } = Layout;

class ProductCard extends Component {
  renderProducts() {
    const productsData = this.props.data.products;
    const products = productsData.map((val, idx) => {
      return (
        <CommonProductCard data={val} key={`productCard-${idx}`} />
      )
    })
    return (
      <Row>
        {products}
      </Row>
    )
  }

  /**
   * this.props.data: {
   *   label: String,
   *   products: Array
   * }
   * @returns {*}
   */
  render() {
    return (
      <div className={commonStyles.card}>
        <div>
          <div className={commonStyles.cardTitle}>{this.props.data.label}</div>
          <div>
            {this.renderProducts()}
          </div>
        </div>
      </div>
    )
  }
}

class MainHomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homeData: []
    }
  }
  async componentDidMount() {
    const response = await mainPageService.mainHomeData()
    if (!response.ok) {
      return message.info(JSON.stringify(response))
    }
    const homeData = await response.json()
    this.setState({homeData})
  }
  renderProductCards() {
    const homeData = this.state.homeData;
    return homeData.map((val, idx) => <ProductCard data={val} key={`productCard-${idx}`}></ProductCard>);
  }
  render() {
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader></MenuHeader>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
          </Breadcrumb>
          <div className={commonStyles.pageBackground}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                {this.renderProductCards()}
              </div>
            </div>
          </div>
        </Content>

      </Layout>
    )
  }
}

export default MainHomePage