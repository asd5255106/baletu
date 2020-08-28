import request from "../utils/request";

export default {
    // 功能: 获取室友数据
    getShiyoulist(address) {
        // console.log(page, pagesize, address);
        return request.get("/good/checksy", {
            params: {
                address
            }
        });
    }
}