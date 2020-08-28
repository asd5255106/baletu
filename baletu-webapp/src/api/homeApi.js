import request from "../utils/request";

export default {
    // 功能: 获取首页数据
    getHomelist(page, pagesize, address) {
        // console.log(page, pagesize, address);
        return request.get("/good/list/", {
            params: {
                page,
                pagesize,
                address
            }
        });
    }
}