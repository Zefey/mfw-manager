import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon,Button } from 'antd';
import * as types from '../../constants/ActionTypes';
import Banner from '../Banner'
import Location from '../Location'

import {logoutAction} from '../../actions/LoginAction'
import File from '../File'
import './style.scss';
import QuickKnow from '../QuickKnow';
import Reply from '../Reply';
import Route from '../Route';
import Travel from '../Travel';

const SubMenu = Menu.SubMenu;
const { Header, Sider, Content } = Layout;

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            menuKey:'1'
        }
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        console.log('nextProps:' , nextProps);
        this.resolve(nextProps.LoginReducer);
    }

    render(){
        let {menuKey} = this.state;
        let username = sessionStorage.getItem('phone');
        let jsx = <div/>;
        switch (menuKey) {
            case '1':
                jsx = <HomeItem setState={this._setState}/>;
                break;
            case '2':
                jsx = <Banner setState={this._setState}/>;
                break;
            case '3':
                jsx = <Location setState={this._setState}/>;
                break;
            case '4':
                jsx = <QuickKnow setState={this._setState}/>;
                break;
            case '5':
                jsx = <Reply setState={this._setState}/>;
                break;
            case '6':
                jsx = <Route setState={this._setState}/>;
                break;
            case '7':
                jsx = <Travel setState={this._setState}/>;
                break;
            case '10':
                jsx = <File setState={this._setState}/>;
                break;
            default:
                jsx = <HomeItem setState={this._setState}/>;
        }
        return (
            <Layout id="home">
                <Header className="header">
                  <div className="logo">
                    <span style={{fontSize: '28px', color: '#fff'}}>马蜂窝</span>
                  </div>
                  <div className="info" >
                    <Icon type="user" style={{fontSize: '18px', color: '#fff'}}/>
                    <span style={{fontSize: '18px', color: '#fff',margin:10,marginRight:30}}>{username}</span>
                    <Button onClick={this.logout} ghost>退出登录</Button>
                  </div>
                </Header>
                <Layout>
                  <Sider
                    theme="light"
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={[menuKey]}
                            onClick={this.handleClick}>
                          <Menu.Item key="1">
                            <Icon type="laptop" />
                            <span>首页</span>
                          </Menu.Item>

                          <Menu.Item key="2">
                            <Icon type="book" />
                            <span>Banner</span>
                          </Menu.Item>

                          <Menu.Item key="3">
                            <Icon type="appstore" />
                            <span>位置</span>
                          </Menu.Item>

                          <Menu.Item key="4">
                            <Icon type="bulb" />
                            <span>快速了解</span>
                          </Menu.Item>

                          <Menu.Item key="5">
                            <Icon type="smile" />
                            <span>回复</span>
                          </Menu.Item>

                          <Menu.Item key="6">
                            <Icon type="rocket" />
                            <span>行程路线</span>
                          </Menu.Item>

                          <Menu.Item key="7">
                            <Icon type="alert" />
                            <span>旅游攻略</span>
                          </Menu.Item>

                          <Menu.Item key="10">
                            <Icon type="file" />
                            <span>文件</span>
                          </Menu.Item>
                        </Menu>
                  </Sider>
                  {jsx}
                </Layout>
            </Layout>
        )
    }


    init = () => {
    };

    resolve = (LoginReducer) => {
        let {status, type} = LoginReducer;
        if(type == types.LOGOUT_SUCCESS){
            if(status == 1){
                this.props.history.push('/');
            }
        }
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handleClick = (e) => {
        console.log(e);
        this.setState({
            menuKey:e.key
        })
    };

    _setState = (data) => {
        this.setState(data);
    }

    logout = (e) => {
        this.props.logoutAction();
    }

}


class HomeItem extends Component {
    render(){
        return(
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>马蜂窝</Breadcrumb.Item>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                Personal information.
              </Content>
            </Layout>
        )
    }
}

export default connect((state) => {
    const { LoginReducer } = state;
    return {
        LoginReducer
    };
},{logoutAction})(Home)
