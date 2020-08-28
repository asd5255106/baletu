import request from "../utils/request";

export default {
    // 功能: 获取列表数据
    getRenderlist(page, pagesize, type, address, opt, sort) {
        // console.log(page, pagesize, address);
        return request.get("/good/list/", {
            params: {
                page, pagesize, type, address, opt, sort
            }
        });
    }
}