import React from "react";

import { Layout, Breadcrumb, message, Modal, Input, Form, } from 'antd';
import LeftNav from "../../components/leftNav";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
//as重命名
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";

// 用户管理
import UserManage from "../../components/userManage";
// 房源管理
import HouseManage from "../../components/houseManage";
// 预约管理
import OrderManage from "../../components/orderManage";
// 获取cookie
import { getUser, logOut, getUid } from "../../untils/auth";
import userApi from "../../api/usersApi"

import "../../assets/css/home.css"


const { Header, Content } = Layout;

// 首页
class Indexpage extends React.Component {
    constructor() {
        super()

        this.state = {
            username: "",
            visible: false,
            confirmLoading: false,
        }
        this.formRef = React.createRef();
    }

    // 确定键
    async handleOk(values) {
        console.log(values)
        this.setState({
            confirmLoading: true,
        });
        let user_id = getUid()
        let p = await userApi.editPwd(this.state.username,values.password,user_id)
        console.log(p)
        if(p.data.flag) {
            message.success("修改成功")
            this.props.history.push("/login")
        }else{
            message.error("修改失败")
        }
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    };

    //   取消
    handleCancel = () => {
        this.formRef.current.resetFields()
        this.setState({
            visible: false,
        });
    };

    // 退出
    logOut() {
        console.log(1213)
    }

    // 面包屑
    // getbread() {
    //     console.log(window.location.pathname)
    //     switch (window.location.pathname) {
    //         case "/home/user":
    //             return "用户管理"
    //         case "/home/house":
    //             return "房源管理"
    //         case "/home/order":
    //             return "预约管理"
    //     }
    // }

    componentDidMount() {
        let username = getUser()
        this.setState({
            username
        })
    }
    render() {
        // 退出登录
        const logOutUser = () => {
            logOut()
            message.success("退出登录成功")
            this.props.history.push("/login")
        }

        // 修改密码
        const showModal = () => {
            this.setState({
                visible: true,
            });
        };

        const menu = (
            <Menu>
                <Menu.Item onClick={showModal}>
                    修改密码
                </Menu.Item>

                <Menu.Item danger onClick={logOutUser} >退出登录</Menu.Item>
            </Menu>
        );

        // let breadname = this.getbread()

        return (
            <React.Fragment>
                <Layout>
                    {/* 头部 */}
                    <Header className="header">
                        <div className="logo">
                            <a href="javescript:;">
                                <img src="http://www.baletu.com/logo2018.png" alt="巴乐兔租房" />
                            </a>
                        </div>
                        <Dropdown overlay={menu}>
                            <a href="" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {this.state.username},欢迎您 <DownOutlined />
                            </a>
                        </Dropdown>
                    </Header>
                    <Layout>
                        <Router>
                            {/* 侧边导航 */}
                            <LeftNav></LeftNav>

                            {/* 主要内容 */}
                            <Layout style={{ padding: '0 24px 24px' }}>
                                {/* 面包屑 */}
                                <Breadcrumb separator=">" style={{ margin: '16px', textAlign: 'left' }}>
                                    <Breadcrumb.Item style={{ color: '#58bc58' }}>Home</Breadcrumb.Item>
                                    {/* <Breadcrumb.Item style={{ color: '#58bc58' }}>{breadname}</Breadcrumb.Item> */}
                                </Breadcrumb>
                                {/* 主要内容 */}
                                <Content
                                    className="site-layout-background"
                                    style={{
                                        padding: 24,
                                        margin: 0,
                                    }}
                                >
                                    {/* 设置路由 */}
                                    <Route path="/home/user" component={UserManage}></Route>
                                    <Route
                                        path="/home"
                                        exact
                                        render={() => <Redirect to="/home/user" />}
                                    ></Route>
                                    <Route path="/home/house" component={HouseManage}></Route>
                                    <Route path="/home/order" component={OrderManage}></Route>
                                </Content>
                            </Layout>
                        </Router>
                    </Layout>
                </Layout>,

                {/* 弹出层 */}
                <Form
                ref={this.formRef}
                    name="undata"
                >
                    <Modal
                        title="修改密码"
                        visible={this.state.visible}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={this.handleCancel.bind(this)}
                        onOk={() => {
                            this.formRef.current
                              .validateFields()
                              .then(values => {
                                this.formRef.current.resetFields();
                                this.handleOk(values)
                              })
                              .catch(info => {
                                console.log('Validate Failed:', info);
                              });
                          }}
                        // this.handleOk.bind(this)
                    >

                        <Form.Item
                            name="username"
                            label="用户名"
                            style={{ marginLeft:21 }}
                        >
                            <Input disabled defaultValue={this.state.username} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('密码不一致');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Modal>
                </Form>
            </React.Fragment>
        )
    }
}

export default Indexpage;




