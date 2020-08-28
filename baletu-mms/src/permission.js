// 路由守卫

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./untils/auth";
import usersApi from "./api/usersApi";

function AuthRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => {
          // let token = localStorage.getItem("token");
          let token = getToken();
          // console.log(token, 567);
          let next = "";
          if (token) {
            //获取token进行校验 ajax
            next = <Component {...props} />; //先通过再判断进行拦截，否则异步原因页面可能会空白
            usersApi.checkToken(token).then((res) => {
              // console.log(res.data, 9092);
              // console.log(props);
              if (!res.data.flag) {
                //校验不通过就跳到登录页
                props.history.push("/login");
              }
            });
            // console.log(result, 999977);
            //ajax
          } else {
            // console.log("回到登录页");
            next = (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          }
  
          // console.log(next, 9900);
          return next;
        }}
      />
    );
  }
  
export default AuthRoute;