import React, {Component} from 'react';
import { connect } from 'react-redux'
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
            confirmLoading:false,

            id:'',
            location:'',
            type:'',
            title:'',
            url:'',
            img:''
        }
    }

    componentDidMount(){
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.resolve(nextProps.BannerReducer);
    }


    render(){
        const {data,visible,confirmLoading, id,location,type,title,url,img} = this.state;
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
                title: '类型',
                dataIndex: 'type',
                key: 'type'
            },{
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            },{
                title: '跳转链接',
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
                        <span>类型:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="类型：1为推荐阅读 2为目的地"
                            value={type}
                            onChange={(e)=>{
                                this.setState({
                                    type:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
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
                        <span>跳转链接:</span>
                    </Col>
                    <Col span={12}>
                        <Input
                            placeholder="跳转链接"
                            value={url}
                            onChange={(e)=>{
                                this.setState({
                                    url:e.target.value
                                })
                            }} />
                    </Col>
                  </Row>
                  
              </Modal>
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
        this.props.handleBanner(reqData);
    }

    handleCancel = () => {
        this.setState({
            visible:false,

            id:'',
            location:'',
            type:'',
            title:'',
            url:'',
            img:''
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
