import request from "../utils/request";

export default {
    // 功能: 获取室友数据
    getGyGglist(address) {
        // console.log(page, pagesize, address);
        return request.get("/good/checkgg", {
            params: {
                address
            }
        });
    }
}