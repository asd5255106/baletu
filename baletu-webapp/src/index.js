import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 引入移动端适配
import 'lib-flexible';

// 2.引入redux和react-redux
import { Provider } from "react-redux";
// 引入仓库store的reducers
import store from "./store/reducers";

// 引入md5
import md5 from "md5";
React.Component.prototype.$md5 = md5;

ReactDOM.render(
  // <React.StrictMode>
  // 5.把仓库的数据和方法注入到react组件里面，我们就可以去到组件里面接收数据了
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
