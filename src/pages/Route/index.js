import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Row ,Col, Button,Divider,Modal,message,Select,Input,Tag } from 'antd';
import * as types from '../../constants/ActionTypes';
import {routeList,handleRoute,routeDelete} from '../../actions/RouteAction'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class Route extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            visible:false,
            confirmLoading:false,

            id:'',
            title:'',
            titleImg:'',
            contentImg:'',
            tags:'',
            location:'',
            location_title:'',
            route:'',
            location_img:'',
            content:''
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve(nextProps.RouteReducer);
    }


    render(){
        const {data,visible,confirmLoading, id,title,titleImg,contentImg,tags,location,location_title,route,location_img,content} = this.state;
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
                title: '标题',
                dataIndex: 'title',
                key: 'title',
            },{
                title: '标题图片',
                dataIndex: 'titleImg',
                key: 'titleImg',
                render: (text, record) => (
                    <img src={text} style={{height:'80px',width:'100px'}}/>
                )
            },{
                title: '内容图片',
                dataIndex: 'contentImg',
                key: 'contentImg',
                render: (text, record) => (
                    <img src={text} style={{height:'80px',width:'100px'}}/>
                )
            },{
                title: '标签',
                dataIndex: 'tags',
                key: 'tags'
            },{
                title: '位置',
                dataIndex: 'location',
                key: 'location'
            },{
                title: '位置标题',
                dataIndex: 'location_title',
                key: 'location_title'
            },{
                title: '路径',
                dataIndex: 'route',
                key: 'route'
            },{
                title: '位置图片',
                dataIndex: 'location_img',
                key: 'location_img',
                render: (text, record) => (
                    <img src={text} style={{height:'80px',width:'100px'}}/>
                )
            },{
                title: '位置描述',
                dataIndex: 'content',
                key: 'content',
                width:400,
            }
        ]
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>马蜂窝</Breadcrumb.Item>
                <Breadcrumb.Item>行程路线</Breadcrumb.Item>
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
                        <span>标题:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="标题"
                            value={title}
                            onChange={(e)=>{
                                this.setState({
                                    title:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>标题图片:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="标题图片"
                            value={titleImg}
                            onChange={(e)=>{
                                this.setState({
                                    titleImg:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>内容图片:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="内容图片"
                            value={contentImg}
                            onChange={(e)=>{
                                this.setState({
                                    contentImg:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>标签:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="标签"
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
                        <span>位置标题:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="位置标题"
                            value={location_title}
                            onChange={(e)=>{
                                this.setState({
                                    location_title:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>路径:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="路径"
                            value={route}
                            onChange={(e)=>{
                                this.setState({
                                    route:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>位置图片:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="位置图片"
                            value={location_img}
                            onChange={(e)=>{
                                this.setState({
                                    location_img:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>位置描述:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="位置描述"
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
        this.props.routeList();
    };

    resolve = (RouteReducer) => {
        let {status, data, type, info} = RouteReducer;
        //列表
        if(status == 1 && type == types.ROUTE_LIST){
            this.setState({
                data:data
            })
        }
        //更新
        if(type == types.HANDLE_ROUTE){
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
        if(type == types.ROUTE_DELETE){
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
        this.props.handleRoute(reqData);
    }

    handleCancel = () => {
        this.setState({
            visible:false,

            id:'',
            title:'',
            titleImg:'',
            contentImg:'',
            tags:'',
            location:'',
            location_title:'',
            route:'',
            location_img:'',
            content:''
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
                this.props.routeDelete(reqData);
            },
            onCancel:() => {
              console.log('Cancel');
            },
      });
  }

}

export default connect((state) => {
    let { RouteReducer } = state;
    return {
        RouteReducer
    };
},{ routeList,handleRoute,routeDelete })(Route)
