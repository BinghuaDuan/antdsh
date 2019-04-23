import React, { Component } from 'react';
import { Layout, Breadcrumb, Table, message } from 'antd';
import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from '../../common/css/common.module.scss';
import schemaService from '../service/SchemaService';
import RESULT from "../../common/constant/Result";
import SCHEMA_CONST from "../constant/SchemaConstant";

const { Content } = Layout;

class SchemaInfoTabel extends Component {

  onChange = (pagination, filters, sorter) => {

  };

  confirmMatch = async (sid) => {
    const response = await schemaService.confirmMatch(sid);
    if (!response.ok) {
      return message.info(JSON.stringify(response));
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      return message.info(JSON.stringify(results));
    }
    message.success('已提交匹配');
    setTimeout(() => {
      this.props.updateData();
    }, 1000);
  };

  renderAction = (text, record) => {
    if (['0'].includes(record.status)) {
      return (
        <span>
          <a href={`/schema/edit?sname=${record.sname}&sid=${record.sid}`}>修改</a>
          <span> | </span>
          <a onClick={this.confirmMatch.bind(this, record.sid)}>确认匹配</a>
        </span>
      )
    }
    else if (['1', '2', '3', '4'].includes(record.status)) {
      return (
        <span>
          <a href={`/schema/view?sname=${record.sname}&sid=${record.sid}`}>查看</a>
        </span>
      )
    }
    else if (['5'].includes(record.status)) {
      return (
        <span>
          <a href={`/schema/view?sname=${record.sname}&sid=${record.sid}`}>查看</a>
        </span>
      )
    }
    else {
      console.log(`record.status = ${record.status}`);
    }
  };

  render() {
    const columns = [
      {
        title: '模板名',
        dataIndex: 'sname',
        key: 'sname',
        sorter: (a, b) => {
          if (a.sname > b.sname) return 1;
          else if (a.sname < b.sname) return -1;
          else return 0;
        }
      },
      {
        title: '更新时间',
        dataIndex: 'updated',
        key: 'updated',
        sorter: (a, b) => b.updated - a.updated,
        render: (text, record) => text.toLocaleDateString(),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          if (['0'].includes(record.status)) {
            return '待匹配'
          }
          else if (['1', '2', '3'].includes(record.status)) {
            return '匹配中'
          }
          else if (['4'].includes(record.status)) {
            return '已融合'
          }
          else if (['5'].includes(record.status)) {
            return '待确认'
          }
          else {
            return '未知状态'
          }
        },
        filters: [
          {
            text: '待匹配',
            value: '待匹配',
          },
          {
            text: '匹配中',
            value: '匹配中',
          },
          {
            text: '已融合',
            value: '已融合',
          },
          {
            text: '待确认',
            value: '待确认',
          },
          {
            text: '未知状态',
            value: '未知状态',
          },
        ],
        onFilter: (value, record) => {
          if (value === '待匹配') {
            return ['0'].includes(record.status);
          }
          else if (value === '匹配中') {
            return ['1', '2', '3'].includes(record.status);
          }
          else if (value === '已融合') {
            return ['4'].includes(record.status);
          }
          else if (value === '待确认') {
            return ['5'].includes(record.status);
          }
          else if (value === '未知状态') {
            return !['0', '1', '2', '3', '4', '5'].includes(record.status);
          }
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: this.renderAction,
      },
    ];
    const data = this.props.data;
    return (
      <Table columns={columns} dataSource={data} onChange={this.onChange} />
    )

  }
}

class SchemaListPage extends Component {

  state = {
    schemaInfoData: [],
  };

  componentDidMount = () => {
    this.setSchemaInfoData();

  };

  setSchemaInfoData = async () => {
    const response = await schemaService.getSchemaInfo();
    if (!response.ok) {
      return message.info(JSON.stringify(response));
    }
    const results = await response.json();
    if (results.code !== RESULT.DEFAULT_SUCC_CODE) {
      return message.info(JSON.stringify(results));
    }
    const schemaInfoData = results.data.map((val, idx) => {
      return {
        key: `schemaInfoTableDataKey${idx}`,
        sid: val.sid,
        sname: val.sname,
        status: val.status + '',
        updated: new Date(val.updated),
        action: val.status,
      }
    });
    this.setState({ schemaInfoData });
  };

  render() {

    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="2" />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><a href={SCHEMA_CONST.HREF.MAIN}>模板</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href={SCHEMA_CONST.HREF.LIST}>列表</a></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#f8f9fa', padding: 24, height: '100%' }}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <SchemaInfoTabel data={this.state.schemaInfoData} updateData={this.setSchemaInfoData}/>
              </div>
            </div>
          </div>
        </Content>

      </Layout>
    )
  }
}

export default SchemaListPage;