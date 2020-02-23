import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Row ,Col, Button,Divider,Modal,message,Select,Input,Tag } from 'antd';
import * as types from '../../constants/ActionTypes';
import {scenicList,handleScenic,scenicDelete} from '../../actions/ScenicAction'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class Scenic extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            visible:false,
            confirmLoading:false,

            id:'',
            img:'',
            location:'',
            name:'',
            tags:'',
            latitude:'',
            longitude:'',
            openTime:'',
            content:'',
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve(nextProps.ScenicReducer);
    }


    render(){
        const {data,visible,confirmLoading, id,img,location,name,tags,latitude,longitude,openTime,content} = this.state;
        //表格结构
        const columns = [
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width:200,
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
                title: '图片',
                dataIndex: 'img',
                key: 'img',
                render: (text, record) => (
                    !!text?
                    <img src={text} style={{height:'80px',width:'100px'}}/>
                    :
                    null
                )
            },{
                title: '位置',
                dataIndex: 'location',
                key: 'location'
            },{
                title: '景点名',
                dataIndex: 'name',
                key: 'name'
            },{
                title: '景点标签',
                dataIndex: 'tags',
                key: 'tags'
            },{
                title: '景点纬度',
                dataIndex: 'latitude',
                key: 'latitude'
            },{
                title: '景点经度',
                dataIndex: 'longitude',
                key: 'longitude'
            },{
                title: '开放时间',
                dataIndex: 'openTime',
                key: 'openTime'
            },{
                title: '景点描述',
                dataIndex: 'content',
                key: 'content',
                width:400,
            },
        ]
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>马蜂窝</Breadcrumb.Item>
                <Breadcrumb.Item>位置</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                <Row type="flex" justify="start" align="middle" style={{height:50}}>
                    <Button type="primary" onClick={this.showModal}>添加数据</Button>
                  </Row>
                <Table rowKey={record => record.id} columns={columns} dataSource={data} scroll={{x:true}}/>
              </Content>
              <Modal
                title={id ? '编辑数据':'新增数据'}
                width={'500px'}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}>
                <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>图片:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="图片"
                            value={img}
                            onChange={(e)=>{
                                this.setState({
                                    img:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>位置:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="位置"
                            value={location}
                            onChange={(e)=>{
                                this.setState({
                                    location:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>景点名:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="景点名"
                            value={name}
                            onChange={(e)=>{
                                this.setState({
                                    name:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>景点标签:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="景点标签"
                            value={tags}
                            onChange={(e)=>{
                                this.setState({
                                    tags:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>景点纬度:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="景点纬度"
                            value={latitude}
                            onChange={(e)=>{
                                this.setState({
                                    latitude:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>景点经度:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="景点经度"
                            value={longitude}
                            onChange={(e)=>{
                                this.setState({
                                    longitude:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>开放时间:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="开放时间"
                            value={openTime}
                            onChange={(e)=>{
                                this.setState({
                                    openTime:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>景点描述:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="景点描述"
                            value={content}
                            onChange={(e)=>{
                                this.setState({
                                    content:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  
              </Modal>
            </Layout>
        )
    }

    init = () => {
        this.props.scenicList();
    };

    resolve = (ScenicReducer) => {
        let {status, data, type, info} = ScenicReducer;
        //列表
        if(status == 1 && type == types.SCENIC_LIST){
            this.setState({
                data:data
            })
        }
        //更新
        if(type == types.HANDLE_SCENIC){
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
        if(type == types.SCENIC_DELETE){
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
        if(record.id){
            this.setState({
                visible:true,
                ...record
            })
        }else{
            this.setState({
                visible:true
            })
        }
        
    }

    handleOk = () => {
        this.setState({
            confirmLoading:true
        })
        const {data,visible,confirmLoading, ...otherData} = this.state;
        let reqData = {
            ...otherData
            
        }
        this.props.handleScenic(reqData);
    }

    handleCancel = () => {
        this.setState({
            visible:false,

            id:'',
            img:'',
            location:'',
            name:'',
            tags:'',
            latitude:'',
            longitude:'',
            openTime:'',
            content:'',
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
                this.props.scenicDelete(reqData);
            },
            onCancel:() => {
              console.log('Cancel');
            },
      });
  }

}

export default connect((state) => {
    let { ScenicReducer } = state;
    return {
        ScenicReducer
    };
},{ scenicList,handleScenic,scenicDelete })(Scenic)
