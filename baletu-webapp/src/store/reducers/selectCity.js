
// 3.准备数据state和方法 action
let address = JSON.parse(sessionStorage.getItem("nowCity")) ? JSON.parse(sessionStorage.getItem("nowCity")).address : "gz";
let city = JSON.parse(sessionStorage.getItem("nowCity")) ? JSON.parse(sessionStorage.getItem("nowCity")).city : "广州";
// console.log(address, city);
let nowCity = {
  address,
  city,
}; //公共的数据
function selectCityReducer(state = nowCity, action) {
  // console.log(action);
  switch (action.type) {
    case "bj":
      // 把传过来的state和action.data放到一个对象返回
      // return Object.assign({}, state, action.data);
      return { ...state, ...action.data };
    case "sh":
      return { ...state, ...action.data };
    case "sz":
      return { ...state, ...action.data };
    case "gz":
      return { ...state, ...action.data };
    default:
      return state;
  }
}

export default selectCityReducer;