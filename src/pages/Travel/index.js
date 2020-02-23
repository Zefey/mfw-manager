import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Row ,Col, Button,Divider,Modal,message,Select,Input,Tag } from 'antd';
import * as types from '../../constants/ActionTypes';
import {travelList,handleTravel,travelDelete} from '../../actions/TravelAction'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class Travel extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            visible:false,
            confirmLoading:false,

            id:'',
            imgs:'',
            content:'',
            openid:'',
            user_avatar:'',
            user_name:'',
            location:'',
            time:'',
            likes:'',
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve(nextProps.TravelReducer);
    }


    render(){
        const {data,visible,confirmLoading, id,imgs,content,openid,user_avatar,user_name,location,time,likes,} = this.state;
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
                title: '图片数组',
                dataIndex: 'imgs',
                key: 'imgs',
                render: (text, record) => {
                    let [first] = text.split(',');
                    return (
                        <img src={first} style={{height:'80px',width:'100px'}}/>
                    )
                }
            },{
                title: '内容',
                dataIndex: 'content',
                key: 'content',
                width:400,
            },{
                title: '微信openid',
                dataIndex: 'openid',
                key: 'openid'
            },{
                title: '用户头像',
                dataIndex: 'user_avatar',
                key: 'user_avatar',
                render: (text, record) => (
                    <img src={text} style={{height:'80px',width:'80px'}}/>
                )
            },{
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },{
                title: '位置',
                dataIndex: 'location',
                key: 'location'
            },{
                title: '发布时间',
                dataIndex: 'time',
                key: 'time'
            },{
                title: '喜欢',
                dataIndex: 'likes',
                key: 'likes'
            }
        ]
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>马蜂窝</Breadcrumb.Item>
                <Breadcrumb.Item>旅行攻略</Breadcrumb.Item>
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
                        <span>图片数组:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="图片数组"
                            value={imgs}
                            onChange={(e)=>{
                                this.setState({
                                    imgs:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>内容:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="内容"
                            value={content}
                            onChange={(e)=>{
                                this.setState({
                                    content:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>微信openid:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="微信openid"
                            value={openid}
                            onChange={(e)=>{
                                this.setState({
                                    openid:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>用户头像:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="用户头像"
                            value={user_avatar}
                            onChange={(e)=>{
                                this.setState({
                                    user_avatar:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>用户名:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="用户名"
                            value={user_name}
                            onChange={(e)=>{
                                this.setState({
                                    user_name:e.target.value
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
                        <span>发布时间:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="发布时间"
                            value={time}
                            onChange={(e)=>{
                                this.setState({
                                    time:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>喜欢:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="喜欢"
                            value={likes}
                            onChange={(e)=>{
                                this.setState({
                                    likes:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  
              </Modal>
            </Layout>
        )
    }

    init = () => {
        this.props.travelList();
    };

    resolve = (TravelReducer) => {
        let {status, data, type, info} = TravelReducer;
        //列表
        if(status == 1 && type == types.TRAVEL_LIST){
            this.setState({
                data:data
            })
        }
        //更新
        if(type == types.HANDLE_TRAVEL){
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
        if(type == types.TRAVEL_DELETE){
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
        this.props.handleTravel(reqData);
    }

    handleCancel = () => {
        this.setState({
            visible:false,

            id:'',
            imgs:'',
            content:'',
            openid:'',
            user_avatar:'',
            user_name:'',
            location:'',
            time:'',
            likes:'',
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
                this.props.travelDelete(reqData);
            },
            onCancel:() => {
              console.log('Cancel');
            },
      });
  }

}

export default connect((state) => {
    let { TravelReducer } = state;
    return {
        TravelReducer
    };
},{ travelList,handleTravel,travelDelete })(Travel)
