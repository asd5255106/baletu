import React from "react";

import AuthRoute from "../permission"

// import { Layout, Breadcrumb } from 'antd';
// import LeftNav from "../components/leftNav";

//as重命名
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
// 登录
import Login from "../pages/login";
import Home from "../pages/home";
// import CollectionsPage from "../components/CollectionsPage";


// 首页
class Indexpage extends React.Component {
    render() {
        return (
            <React.Fragment>
                    <Router>
                        {/* 设置路由 */}
                        <Route path="/login" component={Login}></Route>
                        <Route
                            path="/"
                            exact
                            render={() => <Redirect to="/home" />}
                        ></Route>
                        <AuthRoute path="/home" component={Home}></AuthRoute>
                    </Router>
            </React.Fragment>
        )
    }
}

export default Indexpage;