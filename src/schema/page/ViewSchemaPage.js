import React, { Component } from 'react';
import { Layout, Breadcrumb, message, Row, Col } from 'antd';
import Remarkable from 'remarkable';
import querystring from 'querystring';

import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from '../../common/css/common.module.scss';
import SchemaTree from '../component/SchemaTree';
import schemaService from '../service/SchemaService';
import RESULT from '../../common/constant/Result';
import SCHEMA_CONST from "../constant/SchemaConstant";
import OWL_CONST from '../constant/OwlConstant';
import APP_CONFIG from '../../appconfig';

const { Content } = Layout;


class ViewSchemaPage extends Component {

  state = {
    sname: "",
    sid: "",
    owl: undefined,
    schemaJson: undefined,
  };

  componentWillMount() {
    const sname = this.getQuery()['sname'];
    const sid = this.getQuery()['sid'];
    this.setState({
      sname,
      sid,
    });
    this.setOwlState(sid);
  }

  render() {
    console.log(this.state.schemaJson);
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="2" />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><a href={SCHEMA_CONST.HREF.MAIN}>模板</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href={SCHEMA_CONST.HREF.LIST}>列表</a></Breadcrumb.Item>
            <Breadcrumb.Item>查看</Breadcrumb.Item>
          </Breadcrumb>
          <div className={commonStyles.pageBackground}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>
                  <span style={{fontSize: "18px"}}>{`模板名:  ${this.state.sname}`}</span>
                </div>
                <div className={commonStyles.card}>
                  <Row>
                    <Col span={12}>
                      <SchemaTree schemaOwl={this.state.owl}
                                  editable={false}
                                  expandAll={true}
                                  submitOwl={this.handleOwlChange}
                                  submitSchemaJson={this.setSchemaJson} >
                      </SchemaTree>
                    </Col>
                    <Col span={12}>
                      <div
                        dangerouslySetInnerHTML={this.getRawMarkup()}
                      />
                    </Col>
                  </Row>

                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }

  /**
   * 1. schemaJson 转换为展示用的json str
   * 2. jsonStr 用```包裹```
   */
  getRawMarkup = () => {
    const md = new Remarkable();
    const schemaJson = this.state.schemaJson;
    const previewJsonData = [];
    const previewJson = {
      "sid": this.getQuery()["sid"],
      "data": previewJsonData
    };
    for (let classNameUri in schemaJson) {
      let className = classNameUri.slice(1);
      let previewJsonObj = {"label": className};
      previewJsonData.push(previewJsonObj);
      let classObj = schemaJson[classNameUri];
      console.log(classObj);
      console.log(OWL_CONST.KEYS.DATATYPE_PROPERTY in classObj);
      console.log(OWL_CONST.KEYS.OBJECT_PROPERTY in classObj);
      if (OWL_CONST.KEYS.DATATYPE_PROPERTY in classObj) {
        for (let propUri in classObj[OWL_CONST.KEYS.DATATYPE_PROPERTY]) {
          let prop = propUri.slice(1);
          previewJsonObj[prop] = null;
        }
      }
      if (OWL_CONST.KEYS.OBJECT_PROPERTY in classObj) {
        for (let propUri in classObj[OWL_CONST.KEYS.OBJECT_PROPERTY]) {
          let prop = propUri.slice(1);
          previewJsonObj[prop] = null;
        }
      }
    }
    const prevewJsonStr = JSON.stringify(previewJson, null ,4);
    let previewStr = `**资源上传接口** \`[POST] ${APP_CONFIG.defaultServer.host}/resource/user/new\` \n\n**资源上传格式预览** \n\n`;
    previewStr += "```\n" + prevewJsonStr + "\n```";
    return { __html: md.render(previewStr) };
  };

  setSchemaJson = (schemaJson) => {
    this.setState({ schemaJson });
  };

  setOwlState = async (sid) => {
    const response = await schemaService.getSchemaInOwl(sid);
    if (!response.ok) {
      return message.error(JSON.stringify(response));
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      return message.error(JSON.stringify(results));
    }
    const owl = JSON.parse(results.data);
    this.setState({ owl });
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

  handleOwlChange = (owl) => {
    this.setState({owl});
  };
}

export default ViewSchemaPage;