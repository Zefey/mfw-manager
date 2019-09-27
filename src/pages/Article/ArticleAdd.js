import React, {Component} from 'react';
import { connect } from 'react-redux'
import showdown from 'showdown'
import { Layout, Breadcrumb, Button, Input, Row ,Col,Divider,Select,message } from 'antd';
import {labelListAction} from '../../actions/LabelAction'
import {categoryListAction} from '../../actions/CategoryAction'
import {articleAddAction} from '../../actions/ArticleAction'
import 'github-markdown-css'

const { Content } = Layout;
const TextArea = Input.TextArea;
const Option = Select.Option;

class ArticleAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:'',
            HTML:'',
            label:[],
            category:[],
            labelData:[],
            categoryData:[],
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
        let {content,HTML,labelData,categoryData,title,label,category} = this.state;
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Article</Breadcrumb.Item>
                <Breadcrumb.Item>Add</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                  <Row type="flex" justify="start" align="middle" style={{height:50}}>
                        <Button type="primary" onClick={this.confirm}> Confirm </Button>
                        <Divider type="vertical" />
                        <Button type="normal" onClick={this.reset}> Reset </Button>
                  </Row>
                  <Divider />
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
              </Content>
            </Layout>
        )
    }

    init = () => {
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

    resolveArticle = (nextArticleReducer) => {
        let ArticleReducer = this.props.ArticleReducer;
        let _setState = this.props.setState;
        if(nextArticleReducer !== ArticleReducer){
            let {status,info} = nextArticleReducer;
            if(status == 1){
                _setState({
                    menuKey:'2'
                });
                info && message.success(info);
            }else if(status == 0){
                info && message.error(info);
            }
        }
    };

    confirm = () => {
        let reqData = {
            title:this.state.title,
            content:this.state.content,
            label:JSON.stringify(this.state.label),
            category:JSON.stringify(this.state.category)
        }
        console.log(reqData);
        this.props.articleAddAction(reqData);

    };

    reset = () => {
        this.setState({
            content:'',
            HTML:'',
        });
    };

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


}

export default connect((state) => {
    let { LabelReducer,CategoryReducer,ArticleReducer } = state;
    return {
        LabelReducer,
        CategoryReducer,
        ArticleReducer
    };
},{ labelListAction,categoryListAction,articleAddAction })(ArticleAdd)
