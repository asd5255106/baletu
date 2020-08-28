import request from "../untils/request";

export default {
    // 验证账户是否存在
    checkName(username) {
        return request.get('/manager/checkname', {
            params: {
                username
            }
        })
    },

    // 登录
    login(username, password) {
        return request.get('/manager/login', {
            params: {
                username,
                password
            }
        })
    },

    // 分页查询
    getList(page, pagesize, search) {
        return request.get('/manager/userlist', {
            params: {
                page,
                pagesize,
                search
            }
        })
    },

    // 新增
    addUser(values) {
        return request({
            method: "post",
            url: "/manager/add",
            headers: { 'Content-Type': 'multipart/form-data' },
            data: values
        })
    },

    // 删除用户
    delUser(id) {
        return request({
            method: "delete",
            url: "/manager/del/" + id,
        });
    },

    // 编辑用户
    edituser(form) {
        return request({
            method: "put",
            url: "/manager/edit",
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            data:form
        })
    },

    // 修改密码
    editPwd(username,password,uid) {
        return request.put('/manager/modify/' + uid,{
            username,
            password
        })
    },

    // 验证token
    checkToken(token){
        return request.get("/manager/verify",{
            params:{
                token
            }
        })
    }
}