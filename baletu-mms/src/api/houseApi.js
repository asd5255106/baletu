import request from "../untils/request";

export default {
    // 分页查询
    getList(page, pagesize, search) {
        return request.get('/manager/goodlist', {
            params: {
                page,
                pagesize,
                search
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
    editGood(form) {
        return request({
            method: "put",
            url: "/manager/editgood",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: form
        })
    },

    // 删除  address    home_id
    delGood(address,home_id) {
        console.log(address)
        return request.delete('/manager/delg', {
            data:{
                address,
                home_id
            }
            
        });
    },
}