import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, FileOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
const { Sider } = Layout;



class LeftNav extends React.Component {
    constructor() {
        super()
        this.state={
            active:""
        }
    }
    componentWillMount(){
        this.getactive()
    }
    getactive = () => {
        // console.log(window)
        switch (window.location.pathname) {

            case "/home/user":
                this.setState({
                    active:"1"
                })
                break
            case "/home/house":
                this.setState({
                    active:"2"
                })
                break
            case "/home/order":
                this.setState({
                    active:"3"
                })
                break
            default :
             this.setState({
                active:"1"
            })
        }
    }

    // componentDidMount(){
    //     this.getactive()
    // }

    render() {
    
        return (
            <Sider width={200} className="site-layout-background">
                <Menu defaultSelectedKeys={this.state.active} mode="inline">
                    <Menu.Item key="1" icon={<UserOutlined />} style={{
                        marginBottom: 4,
                    }}>
                        <Link to="/home/user">用户管理</Link>
                    </Menu.Item>

                    <Menu.Item key="2" icon={<FileOutlined />}>
                        <Link to="/home/house">房源管理</Link>
                    </Menu.Item>

                    <Menu.Item key="3" icon={<FileOutlined />}>
                        <Link to="/home/order">预约管理</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default LeftNav;