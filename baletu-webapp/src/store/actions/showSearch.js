// 把action的方法进一步封装，这里的方法是在组件里面调用的
export function showSearch(data) {
    // console.log(data);
    // {data: true}
    return {
        type: data.show,
        data
    }
}
