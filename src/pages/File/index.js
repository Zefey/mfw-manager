import React, {Component} from 'react';
import { Layout, Breadcrumb,Upload,Icon } from 'antd';
import Config from '../../utils/Config';
const { Content } = Layout;

const Dragger = Upload.Dragger;

export default class File extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Zefey</Breadcrumb.Item>
                <Breadcrumb.Item>File</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
              <Dragger
                name = 'file'
                multiple = {true}
                action = {Config.fileUpload}
                onChange = {this.handleChange}>

                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
              </Content>
            </Layout>
        )
    }

    handleChange = (info) => {
        console.log('info',info);
        let fileList = info.fileList;

        // Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.data[0];
            }
            return file;
        });

        // Filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.status == 1;
          }
          return true;
        });

        this.setState({ fileList });
    }

}
