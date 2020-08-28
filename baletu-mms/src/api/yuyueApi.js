import request from "../untils/request";

export default {
    // 分页查询(区域查询)
    getAddressList(page, pagesize, address) {
        return request.get('/ord/checkaddress', {
            params: {
                page,
                pagesize,
                address
            }
        })
    },
    // 分页查询(用户名查询)
    getUsernameList(page, pagesize, username) {
        return request.get('/ord/checkuser', {
            params: {
                page,
                pagesize,
                username
            }
        })
    },

    // 新增
    addGood(values) {
        return request({
            method: "post",
            url: "/manager/addgood",
            headers: { 'Content-Type': 'multipart/form-data' },
            data: values
        })
    },

    // 编辑
    editGood(user_id, home_id, state) {
        return request({
            method: "put",
            url: "/ord/upinput",
            data: {
                user_id,
                home_id,
                state
            }
        })
    },

    // 删除  address    home_id
    delGood(data) {
        return request({
            method: "delete",
            url: "/manager/delg",
            data,
        });
    },
}