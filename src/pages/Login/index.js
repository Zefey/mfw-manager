import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox,message,Row } from 'antd';
import {loginAction} from '../../actions/LoginAction'
import './style.scss';

const FormItem = Form.Item;

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        console.log('nextProps:' , nextProps);
        this.resolve(nextProps);
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login">
                <Row type="flex" justify="center" align="top">
                    <div className="logo">
                        <span className="Z">Z</span>
                        <span className="E">e</span>
                        <span className="F">f</span>
                        <span className="E">e</span>
                        <span className="Y">y</span>
                    </div>
                </Row>
                <Row type="flex" justify="center" align="middle">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                          {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 16, color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" size="large"/>
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 16, color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" size="large"/>
                          )}
                        </FormItem>
                        <FormItem>
                          {/*getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                          })(

                          )*/}
                          <Checkbox checked>Remember me</Checkbox>
                          {/* <a className="login-form-forgot" href="javascript:;">Forgot password</a> */}
                          <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                            Log in
                          </Button>
                          {/* Or <a href="javascript:;">register now!</a> */}
                        </FormItem>
                    </Form>
                </Row>
            </div>

        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            // request
            this.props.loginAction(values);
          }
        });
    };

    init = () => {
        message.config({
            top: 468,
            duration: 2,
            maxCount: 3,
        });
    };

    resolve = (nextProps) => {
        let nextLoginReducer = nextProps.LoginReducer;
        let LoginReducer = this.props.LoginReducer;
        if(nextLoginReducer !== LoginReducer){
            let {status, info} = nextProps.LoginReducer;
            if(status == 1){
                info && message.success(info);
                this.props.history.push('home');
            }else{
                info && message.error(info);
            }
        }
    };

}

let LoginForm = Form.create()(Login);

export default connect((state) => {
    const { LoginReducer } = state;
    return {
        LoginReducer
    };
},{ loginAction })(LoginForm)
