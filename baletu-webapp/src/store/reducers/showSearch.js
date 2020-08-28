
// 3.准备数据state和方法 action
let showSearch = {
  show: false
}; //公共的数据
function showSearchReducer(state = showSearch, action) {
  // console.log(action);
  switch (action.type) {
    case true:
      // 把传过来的state和action.data放到一个对象返回
      // return Object.assign({}, state, action.data);
      return { ...state, ...action.data };
    case false:
      return { ...state, ...action.data };
    default:
      return state;
  }
}

export default showSearchReducer;