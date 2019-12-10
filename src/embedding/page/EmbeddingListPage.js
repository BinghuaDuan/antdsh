import React, { Component } from 'react';
import {Layout, Breadcrumb, message, Row, Col, Table, Spin, Modal} from 'antd';

import MenuHeader from '../../common/component/MenuHeader';
import commonStyles from '../../common/css/common.module.scss';
import RESULT from '../../common/constant/Result';
import APP_CONFIG from '../../appconfig';
import commonUtil from "../../common/utils/commonUtil";
import embeddingService from "../service/EmbeddingService";
import mainPageService from "../../common/service/mainPageService";
import { STATUS } from '../constant/EmbeddingConstant';
import appconfig from '../../appconfig';


const { Content } = Layout;
const defaultUrlPrefix = appconfig['defaultServer']['host'];


class EmbeddingListTable extends Component {

  state = {
    apiModalVisible: false,
    apiGid: null,
    apiModelname: null,
  };

  render() {
    const columns = [
      {
        title: '图空间',
        dataIndex: 'gid',
      },
      {
        title: '模型',
        dataIndex: 'modelname',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '更新时间',
        dataIndex: 'updated',
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: this.renderAction,
      }
    ];
    const { data } = this.props;
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        {this.renderApiModal()}
      </div>

    )
  }

  renderAction = (text, record) => {
    const { gid, modelname, status } = record;
    if (status === STATUS.trained) {
      return (
        <span>
          <a onClick={this.showApiModal.bind(this, gid, modelname)}>查看接口</a>
          <span> | </span>
          <a onClick={this.postTrainJob.bind(this, gid, modelname)}>重新训练</a>
        </span>
      )
    } else if (status === STATUS.training) {
      return (
        <span>
          <Spin />
        </span>
      )
    } else if (status === STATUS.untrained) {
      return (
        <span>
          <a onClick={this.postTrainJob.bind(this, gid, modelname)}>训练</a>
        </span>
      )
    } else if (status === STATUS.queued) {
      // TODO 训练队列中，可取消训练
    }
  };

  postTrainJob = async (gid, modelname) => {
    const response = await embeddingService.postTrain(gid, modelname);
    if (!response.succ) {
      message.error(JSON.stringify(response));
    }
    message.success('已提交训练任务');
    this.props.updateData();
  };


  showApiModal = (gid, modelname) => {
    this.setState({
      apiModalVisible: true,
      apiGid: gid,
      apiModelname: modelname,
    })
  };

  handleApiModalCancle = () => {
    this.setState({
      apiModalVisible: false,
      apiGid: null,
      apiModelname: null,
    })
  };

  renderApiModal = () => {
    const { apiGid, apiModelname } = this.state;
    return (
      <Modal
        title={"查看接口"}
        visible={this.state.apiModalVisible}
        onOk={this.handleApiModalCancle}
        onCancel={this.handleApiModalCancle}
      >
        <div>{`预测头实体 [GET] ${defaultUrlPrefix}/gspace/${apiGid}/model/${apiModelname}/predict/head/{tailId}/{relType}/{topk}`}</div>
        <br/>
        <div>{`预测尾实体 [GET] ${defaultUrlPrefix}/gspace/${apiGid}/model/${apiModelname}/predict/tail/{headId}/{relType}/{topk}`}</div>
        <br/>
        <div>{`预测关系 [GET] ${defaultUrlPrefix}/gspace/${apiGid}/model/${apiModelname}/predict/rel/{headId}/{tailId}/{topk}`}</div>
        <br/>
        <div>{`预测三元组 [GET] ${defaultUrlPrefix}/gspace/${apiGid}/model/${apiModelname}/predict/triple/{headId}/{tailId}/{relType}/{thresh}`}</div>
        <br/>
        <div>{`获取实体嵌入 [GET] ${defaultUrlPrefix}/gspace/${apiGid}/model/${apiModelname}/entity/{entId}/embedding`}</div>
        <br/>
        <div>{`获取关系嵌入 [GET] ${defaultUrlPrefix}/gspace/${apiGid}/model/${apiModelname}/relation/{relType}/embedding`}</div>
      </Modal>
    )
  };

}


class EmbeddingListPage extends Component {

  state = {
    gid: "",
    modelsInfo: [], // { gid: 0, modelname: '', status: STATUS.trained, updated: '' }
  };

  componentWillMount() {
    const {gid} = commonUtil.getQuery();
    this.setState({
      gid,
    });
    this.setModelsInfo(gid);
  }

  render() {
    const { gid, modelsInfo } = this.state;

    return (
      <Layout className="layout" style={{ height: "100%" }}>
        <MenuHeader defaultSelectedKey="2" />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><a href={`/`}>首页</a></Breadcrumb.Item>
            <Breadcrumb.Item>图嵌入</Breadcrumb.Item>
          </Breadcrumb>
          <div className={commonStyles.pageBackground}>
            <div className={commonStyles.page}>
              <div className={commonStyles.content}>
                <div className={commonStyles.card}>
                  <span style={{fontSize: "18px"}}>{`图嵌入`}</span>
                </div>
                <div className={commonStyles.card}>
                  <EmbeddingListTable data={modelsInfo} updateData={this.setModelsInfo.bind(this, gid)} />
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }

  setModelsInfo = async (gid) => {
    let response = await embeddingService.getAvailabelMethods();
    if (!response.succ) {
      message.info(JSON.stringify(response));
      return;
    }
    let methods = response.data;
    response = await embeddingService.getAvailableModelsByGid(gid);
    if (!response.succ) {
      message.info(JSON.stringify(response));
      return;
    }
    const availableModels = response.data;

    let availableMethods = new Set();
    let modelsInfo = [];
    availableModels.forEach((val) => {
      modelsInfo.push({
        gid,
        modelname: val['modelname'],
        status: val['available'] ? STATUS.trained : STATUS.training,
        updated: new Date(val['updated']).toLocaleString(),
      });
      availableMethods.add(val['modelname'])
    });
    methods.forEach((val) => {
      if (!availableMethods.has(val)) {
        modelsInfo.push({
          gid,
          modelname: val,
          status: STATUS.untrained,
          updated: "",
        })
      }
    });
    this.setState({ modelsInfo })
  }
}

export default EmbeddingListPage;