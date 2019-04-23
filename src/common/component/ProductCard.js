import React, { Component } from 'react';
import { Col } from 'antd';
import productCardStyles from '../css/productCard.module.scss';

class ProductCard extends Component {

  /**
   * this.props.data: {
   *   href: String,
   *   imgSrc: String,
   *   title: String,
   *   desc: String,
   * }
   * @returns {*}
   */
  render() {
    const data = this.props.data;
    return (
      <Col span={6} key={`products-${Math.random()}`}>
        <a className={productCardStyles.card} href={data.href}>
          <div className={productCardStyles.cardImg}>
            <img src={data.imgSrc} alt={data.title}></img>
          </div>
          <div className={productCardStyles.cardTitle}>
            {data.title}
          </div>
          <div className={productCardStyles.cardDesc}>
            {data.desc}
          </div>
        </a>
      </Col>
    )
  }
}

export default ProductCard;