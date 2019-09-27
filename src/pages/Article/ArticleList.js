import React, {Component} from 'react';
import { connect } from 'react-redux'
import showdown from 'showdown'
import { Layout, Breadcrumb, Table, Row ,Col, Button,Divider,Modal,message,Select,Input,Tag } from 'antd';
import * as types from '../../constants/ActionTypes';
import {articleListAction,articleUpdateAction,articleDeleteAction} from '../../actions/ArticleAction'
import {labelListAction} from '../../actions/LabelAction'
import {categoryListAction} from '../../actions/CategoryAction'
import 'github-markdown-css'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class ArticleList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            visible:false,
            confirmLoading:false,
            title:'',
            content:'',
            HTML:'',
            category:[],
            label:[],
            labelData:[],
            categoryData:[]

        }
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        this.resolveLabel(nextProps.LabelReducer);
        this.resolveCategory(nextProps.CategoryReducer);
        this.resolveArticle(nextProps.ArticleReducer);
    }


    render(){
        let {data,visible,confirmLoading,labelData,categoryData,title,content,HTML,label,category} = this.state;
        //表格结构
        const columns = [
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button type="primary" onClick={()=>{this.showEditConfirm(record)}}>Edit</Button>
                        <Divider type="vertical" />
                        <Button type="danger" onClick={()=>{this.showDeleteConfirm(record)}}>Delete</Button>
                    </span>
                )
            },{
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },{
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },{
                title: 'Last Modified',
                dataIndex: 'time',
                key: 'time'
            },{
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            },{
                title: 'Label',
                dataIndex: 'label',
                key: 'label',
                render: (text, record) => (
                    <span>
                        {text.map(({id,name}) => <Tag color="blue" key={id}>{name}</Tag>)}
                    </span>
                )
            }
        ]
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Article</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                <Table rowKey={record => record.id} columns={columns} dataSource={data} />
              </Content>
              <Modal
                title={"Edit"}
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
                          onChange={this.handleMarkDownChange} />
                    </Col>
                    <Col xs={12}>
                      <div className="markdown-body" style={{height:600,overflow:'auto',paddingLeft:40,paddingRigth:40}} dangerouslySetInnerHTML = {{ __html:HTML }}/>
                    </Col>
                  </Row>
              </Modal>
            </Layout>
        )
    }

    init = () => {
        let reqData={
            start:0,
            offset:9999
        }
        this.props.articleListAction(reqData);
        this.props.labelListAction();
        this.props.categoryListAction();

    };

    resolveLabel = (nextLabelReducer) => {
        if(nextLabelReducer.status == 1){
            this.setState({
                labelData:nextLabelReducer.data
            });
        }
    };

    resolveCategory = (nextCategoryReducer) => {
        if(nextCategoryReducer.status == 1){
            this.setState({
                categoryData:nextCategoryReducer.data
            });
        }
    };

    resolveArticle = (ArticleReducer) => {
        let {status, data, type, info} = ArticleReducer;
        //列表
        if(status == 1 && type == types.ARTICLE_LIST){
            this.setState({
                data:data
            })
        }
        //更新
        if(type == types.ARTICLE_UPDATE){
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
        if(type == types.ARTICLE_DELETE){
            if(status == 1){
                this.init();
                info && message.success(info);
              }else{
                info && message.error(info);
              }
        }
    };

    
    showEditConfirm = (record) => {
        let {id,title,content,label,categoryId,category} = record;
        let converter = new showdown.Converter();
        let l = [];
        for(let i in label){
            let json = {};
            json['key'] = label[i]['id'].toString();
            json['label'] = label[i]['name'];
            l.push(json);
        }
        this.setState({
            visible:true,
            id:id,
            title:title,
            content:content,
            HTML:converter.makeHtml(content),
            label:l,
            category:{key:categoryId,label:category}
        })
    }

    handleMarkDownChange = (e) => {
        let text = e.target.value;
        let converter = new showdown.Converter();
        let html = converter.makeHtml(text);
        console.log('html',html);
        this.setState({
            content:text,
            HTML:html
        });
    };

    handleTitleChange = (e) => {
        this.setState({
            title:e.target.value
        });
    };

    handleLabelChange = (value) => {
        console.log('handleLabelChange',value);
        this.setState({
            label:value
        })
    };

    handleCategoryChange = (value) => {
        console.log('handleCategoryChange',value);
        this.setState({
            category:value
        })
    };

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
            title: 'Are you sure delete this Article?',
            content: 'In fact, it\'s just hidden. .',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:() => {
                let reqData={
                    id:record.id
                }
                this.props.articleDeleteAction(reqData);
            },
            onCancel:() => {
              console.log('Cancel');
            },
      });
  }

}

export default connect((state) => {
    let { ArticleReducer,LabelReducer,CategoryReducer } = state;
    return {
        ArticleReducer,
        LabelReducer,
        CategoryReducer
    };
},{ articleListAction,articleUpdateAction,articleDeleteAction,labelListAction,categoryListAction })(ArticleList)
