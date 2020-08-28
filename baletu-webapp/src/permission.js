// 路由守卫
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./utils/auth";
import usersApi from "./api/usersApi";

//路由守卫
function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        let token = getToken();
        // console.log(token);
        let next = "";
        if (token) {
          // 先通过再判断进行拦截，否则异步原因页面可能会空白
          next = <Component {...props} />;
          usersApi.checkToken(token).then((res) => {
            // console.log(res.data);
            // console.log(props);
            if (!res.data.flag) {
              //校验不通过就跳到登录页
              props.history.push("/login");
            }
          });
        } else {
          next = (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
        return next;
      }}
    />
  );
}

export default AuthRoute;
