import React, { Component } from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col,
  message,
} from 'antd';
import appRecommendService from "../service/appRecommendService";


/**
 * props: {
 *   username: String  // required
 * }
 */
class FileUpload extends Component {
  state = {
    fileList: [],
    uploading: false,
  };

  render() {
    const { uploading, fileList } = this.state;
    return (
      <div>
        <Upload beforeUpload={this.beforeUpload}>
          <Button>
            <Icon type="upload" /> 上传轨道文件
          </Button>
        </Upload>
      </div>

    )
  }

  handleUpload = async (file) => {
    const { username } = this.props;
    const fileName = file.name;
    let request = appRecommendService.uploadTrackFile(username, file);
    try {
      const response = await request;
      if (response.ok) {
        this.setState({
          fileList: [],
        });
        message.success(`${fileName} 上传成功`);
      }
      else {
        message.error(`${fileName} 上传失败`);
      }
    }
    catch (e) {
      message.error(`${fileName} 上传失败`);
    }
  };

  beforeUpload = (file) => {
    const isXlxs = file.type === `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
    if (!isXlxs) {
      message.error('您只能上传xlxs 文件');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error(`xlxs 文件必须小于20M`);
    }
    if (isXlxs && isLt20M) {
      this.handleUpload(file);
    }
    return false;
  };


}

export default FileUpload