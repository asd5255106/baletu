import React from "react";

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// Api接口
import userApi from "../../api/usersApi";
// 存储数据
import {setToken,setUser,setUid } from "../../untils/auth";

import "../../assets/css/login.css"

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            
        }
    }

    async onFinish(values) {
        try{
            let p = await userApi.login(values.username,values.password)
            // console.log(p)
            // console.log(values)
            if(p.data.flag){
                if(values.remember){
                    setToken(p.data.token,7)
                    setUser(values.username,7)
                    setUid(p.data.user_id,7)
                }else{
                    setToken(p.data.token)
                    setUser(values.username)
                    setUid(p.data.user_id)
                }
                message.success("登录成功")

                this.props.history.push("/home")
            }else{
                message.error('用户名或密码错误');
            }

            

        }catch(err){
            console.log(err)
        }
    };
    
    render() {
        return (
            <React.Fragment>
                <div className="login-box">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish.bind(this)}
                    >
                        <h3>巴乐兔后台登录</h3>
                        {/* 用户名 */}
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '用户名不能为空',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </Form.Item>

                        {/* 密码 */}
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="请输入密码"
                            />
                        </Form.Item>

                        {/* 免登陆 */}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>7天免登录</Checkbox>
                            </Form.Item>

                        </Form.Item>

                        {/* 登录按钮 */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </React.Fragment>
        )
    }

}
export default Login