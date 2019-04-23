import React, { Component } from 'react';
import { Layout, Breadcrumb, Button, message } from 'antd';
import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from '../../common/css/common.module.scss';
import SchemaTree from '../component/SchemaTree';
import schemaService from '../service/SchemaService';
import RESULT from '../../common/constant/Result';
import querystring from 'querystring';
import SCHEMA_CONST from "../constant/SchemaConstant";

const { Content } = Layout;

class EditSchemaPage extends Component {

  state = {
    sname: "",
    sid: "",
    owl: undefined,
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

  handleSave = async () => {
    const owl = this.state.owl;
    const sname = this.state.sname;
    if (owl === undefined) {
      return message.info('请添加类');
    };
    const response = await schemaService.editSchema(owl, "JSON-LD", sname);
    if (!response.ok) {
      return message.error(JSON.stringify(response));
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      return message.error(JSON.stringify(results));
    }
    message.success('已保存');
    setTimeout(() => {
      window.location = SCHEMA_CONST.HREF.LIST;
    }, 1000);
  };

  render() {
    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="2" />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><a href={SCHEMA_CONST.HREF.MAIN}>模板</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href={SCHEMA_CONST.HREF.LIST}>列表</a></Breadcrumb.Item>
            <Breadcrumb.Item>编辑</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#f8f9fa', padding: 24, minHeight: '100%' }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>
                  <span style={{fontSize: "18px"}}>{`模板名:  ${this.state.sname}`}</span>
                  <Button onClick={this.handleSave} style={{marginLeft: '10px'}}>保存</Button>
                </div>
                <div className={commonStyles.card}>
                  <SchemaTree schemaOwl={this.state.owl} editable={true} submitOwl={this.handleOwlChange} ></SchemaTree>
                </div>
              </div>
            </div>
          </div>
        </Content>

      </Layout>
    )
  }
}

export default EditSchemaPage;