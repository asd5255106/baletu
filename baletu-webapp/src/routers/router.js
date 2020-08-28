// 引入懒加载组件
import React, { lazy, Suspense } from "react";

// 安装并引入react-router-dom路由, as重命名
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// 路由守卫
import AuthRoute from "../permission";

// 路由懒加载的实现：异步载入资源
/* 路由用的的组件一般放在pages或views里面 */
const IndexPage = lazy(() => import("../pages/index"));
const MyPage = lazy(() => import("../pages/my"));
const LoginPage = lazy(() => import("../pages/login"));
const RegPage = lazy(() => import("../pages/reg"));
const ZhengzuPage = lazy(() => import("../pages/zhengzu"));
const HezuPage = lazy(() => import("../pages/hezu"));
const GongyuPage = lazy(() => import("../pages/gongyu"));
const ShiyouPage = lazy(() => import("../pages/shiyou"));
const XiangQingPage = lazy(() => import("../pages/xiangqing"));
const YuYue = lazy(() => import("../pages/yuyue"));
// console.log(AuthRoute);

/*
    router.js 页面里的代码
    HashRouter:有#号 hash mode
    BrowserRouter:没有#号 history mode
    Route：设置路由与组件关联:路由规则
    Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break(如果有子路由就不要用)
    Link:跳转页面，相当于vue里面的router-link，声明式导航
    exact :完全匹配路由(如果有子路由就不要用)
    Redirect:路由重定向
*/

class RouterComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Suspense fallback={<div>loading</div>}>
              {/* 首页 */}
              <Route path="/home" component={IndexPage}></Route>
              {/* 重定向 */}
              <Route
                path="/"
                exact
                render={() => <Redirect to="/home" />}
              ></Route>
              {/* 整租 */}
              <Route path="/zhengzu" component={ZhengzuPage}></Route>
              {/* 合租 */}
              <Route path="/hezu" component={HezuPage}></Route>
              {/* 公寓 */}
              <Route path="/gongyu" component={GongyuPage}></Route>
              {/* 室友 */}
              <Route path="/shiyou" component={ShiyouPage}></Route>
              {/* 我的 */}
              <AuthRoute path="/my" component={MyPage}></AuthRoute>
              {/* 登录 */}
              <Route path="/login" component={LoginPage}></Route>
              {/* 注册 */}
              <Route path="/reg" component={RegPage}></Route>
              {/* 详情 */}
              <Route path="/xiangqing" component={XiangQingPage}></Route>
              {/* 详情 */}
              <Route path="/yuyue" component={YuYue}></Route>

            </Suspense>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default RouterComponent;
