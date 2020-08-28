// 1.安装redux和react-redux插件
import { createStore, combineReducers, applyMiddleware } from "redux";
// 引入中间件redux-thunk
import thunk from "redux-thunk";

// 引入选择城市的方法
import selectCityReducer from "./selectCity";
// 引入显示搜索页的方法
import showSearchReducer from "./showSearch";

// 4.把数据和方法放到redux的仓库里面:存入仓库
let store = createStore(
  //redux的模块化，类似vuex里面的modules
  combineReducers(
    {
      selectCity: selectCityReducer,
      showSearch: showSearchReducer
    },
    applyMiddleware(thunk)
  )
);

export default store;
