import React, {Component} from 'react';
import { connect } from 'react-redux'
import showdown from 'showdown'
import { Layout, Breadcrumb, Table, Row ,Col, Button,Divider,Modal,message,Select,Input,Tag } from 'antd';
import * as types from '../../constants/ActionTypes';
import {bannerList,handleBanner,bannerDelete} from '../../actions/BannerAction'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            visible:false,
            confirmLoading:false
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve(nextProps.BannerReducer);
    }


    render(){
        let {data,visible,confirmLoading,id} = this.state;
        console.log('data',data);
        //表格结构
        const columns = [
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary" onClick={()=>{this.showModal(record)}}>编辑</Button>
                        <Divider type="vertical" />
                        <Button type="danger" onClick={()=>{this.showDeleteConfirm(record)}}>删除</Button>
                    </span>
                )
            },{
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },{
                title: 'img',
                dataIndex: 'img',
                key: 'img',
                render: (text, record) => (
                    <img src={text} style={{height:'80px',width:'100px'}}/>
                )
            },{
                title: 'location',
                dataIndex: 'location',
                key: 'location'
            },{
                title: 'type',
                dataIndex: 'type',
                key: 'type'
            },{
                title: 'title',
                dataIndex: 'title',
                key: 'title'
            },{
                title: 'url',
                dataIndex: 'url',
                key: 'url'
            }
        ]
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>马蜂窝</Breadcrumb.Item>
                <Breadcrumb.Item>Banner</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                <Row type="flex" justify="start" align="middle" style={{height:50}}>
                    <Button type="primary" onClick={this.showModal}>添加数据</Button>
                  </Row>
                <Table rowKey={record => record.id} columns={columns} dataSource={data} />
              </Content>
              {/* <Modal
                title={id?'新增数据':'编辑数据'}
                style={{minWidth:'70%'}}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <span>文章标题:</span>
                    <Col span={4}>
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={this.handleTitleChange} />
                    </Col>
                    <span>文章标签:</span>
                    <Col span={4}>
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Select"
                            value={label}
                            labelInValue={true}
                            onChange={this.handleLabelChange}>
                            {labelData.map((item,index)=>(
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Col>
                    <span>文章分类:</span>
                    <Col span={3}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select"
                            optionFilterProp="children"
                            value={category}
                            labelInValue={true}
                            onChange={this.handleCategoryChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            {categoryData.map((item,index)=>(
                                <Option key={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Col>
                  </Row>
                  <Row type="flex" justify="center" align="middle">
                    <Col xs={12}>
                      <TextArea
                          style={{height:600}}
                          value={content}
                          placeholder="Input the MarkDown Text,That will be auto Transformation the HTML"
                          onChange={this.handleOnChange} />
                    </Col>
                    <Col xs={12}>
                      <div className="markdown-body" style={{height:600,overflow:'auto',paddingLeft:40,paddingRigth:40}} dangerouslySetInnerHTML = {{ __html:HTML }}/>
                    </Col>
                  </Row>
              </Modal> */}
            </Layout>
        )
    }

    init = () => {
        this.props.bannerList();
    };

    resolve = (BannerReducer) => {
        let {status, data, type, info} = BannerReducer;
        //列表
        if(status == 1 && type == types.BANNER_LIST){
            this.setState({
                data:data
            })
        }
        //更新
        if(type == types.HANDLE_BANNER){
            if(status == 1){
              this.setState({
                  visible:false,
                  confirmLoading:false,
              },()=>{
                this.init();
                info && message.success(info);
              })
            }else{
              info && message.error(info);
            }
        }
        //删除
        if(type == types.BANNER_DELETE){
            if(status == 1){
                this.init();
                info && message.success(info);
              }else{
                info && message.error(info);
              }
        }
    };

    
    showModal = (record={}) => {
        console.log('showModal',record);
        this.setState({
            visible:true,
            ...record
        })
    }

    handleOk = () => {
        this.setState({
            confirmLoading:true
        })
        let reqData = {
            id:this.state.id,
            title:this.state.title,
            content:this.state.content,
            label:JSON.stringify(this.state.label),
            category:JSON.stringify(this.state.category)
        }
        this.props.articleUpdateAction(reqData);
    }

    handleCancel = () => {
        this.setState({
            visible:false
        })
    }

    showDeleteConfirm = (record) => {
        console.log(record);
        Modal.confirm({
            title: '确定删除？',
            content: 'CATION:将彻底移除该数据.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:() => {
                let reqData={
                    id:record.id
                }
                this.props.bannerDelete(reqData);
            },
            onCancel:() => {
              console.log('Cancel');
            },
      });
  }

}

export default connect((state) => {
    let { BannerReducer } = state;
    return {
        BannerReducer
    };
},{ bannerList,handleBanner,bannerDelete })(Banner)
