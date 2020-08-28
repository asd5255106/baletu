// 把action的方法进一步封装，这里的方法是在组件里面调用的
export function selectCity(data) {
  // console.log(data);
  // {address: "sh", city: "上海"}
  return {
    type: data.address,
    data
  }
}
