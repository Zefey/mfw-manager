import React, {Component} from 'react';
import { connect } from 'react-redux'
import showdown from 'showdown'
import { Layout, Breadcrumb, Table, Row ,Col, Button,Divider,Modal,message,Select,Input,Tag } from 'antd';
import * as types from '../../constants/ActionTypes';
import {replyList,handleReply,replyDelete} from '../../actions/ReplyAction'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class Reply extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            visible:false,
            confirmLoading:false,

            id:'',
            user_avatar:'',
            user_name:'',
            openid:'',
            travel_id:'',
            content:'',
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve(nextProps.ReplyReducer);
    }


    render(){
        const {data,visible,confirmLoading, id,user_avatar,user_name,openid,travel_id,content} = this.state;
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
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
                render: (text, record) => (
                    <span>{text || '匿名用户'}</span>
                )
            },{
                title: '头像',
                dataIndex: 'user_avatar',
                key: 'user_avatar',
                render: (text, record) => (
                    <img src={text || 'http://zefey.com/file/1581578380981.png'} style={{height:'80px',width:'80px'}}/>
                )
            },{
                title: '微信openid',
                dataIndex: 'openid',
                key: 'openid'
            },{
                title: '旅游记录id',
                dataIndex: 'travel_id',
                key: 'travel_id'
            },{
                title: '评论内容',
                dataIndex: 'content',
                key: 'content',
                width:400,
            }
        ]
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>马蜂窝</Breadcrumb.Item>
                <Breadcrumb.Item>回复</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                <Row type="flex" justify="start" align="middle" style={{height:50}}>
                    <Button type="primary" onClick={this.showModal}>添加数据</Button>
                  </Row>
                <Table rowKey={record => record.id} columns={columns} dataSource={data} />
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
                        <span>头像:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="头像"
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
                        <span>旅游记录id:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="旅游记录id"
                            value={travel_id}
                            onChange={(e)=>{
                                this.setState({
                                    travel_id:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  <Row type="flex" justify="start" align="middle" gutter={16} style={{ marginBottom:20}}>
                    <Col span={4} align="center">
                        <span>回复内容:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="回复内容"
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
        this.props.replyList();
    };

    resolve = (ReplyReducer) => {
        let {status, data, type, info} = ReplyReducer;
        //列表
        if(status == 1 && type == types.REPLY_LIST){
            this.setState({
                data:data
            })
        }
        //更新
        if(type == types.HANDLE_REPLY){
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
        if(type == types.REPLY_DELETE){
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
        this.props.handleReply(reqData);
    }

    handleCancel = () => {
        this.setState({
            visible:false,

            id:'',
            user_avatar:'',
            user_name:'',
            openid:'',
            travel_id:'',
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
                this.props.replyDelete(reqData);
            },
            onCancel:() => {
              console.log('Cancel');
            },
      });
  }

}

export default connect((state) => {
    let { ReplyReducer } = state;
    return {
        ReplyReducer
    };
},{ replyList,handleReply,replyDelete })(Reply)
