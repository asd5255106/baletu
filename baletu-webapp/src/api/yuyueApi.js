import request from "../utils/request";

export default {
    // 功能: 获取用户名的预约数据
    getYuyuellist(username) {
        // console.log(page, pagesize, address);
        return request.get("/ord/checkuser", {
            params: {
                username
            }
        });
    },
    // 功能:点击提交预约
    onClick(home_id, address, user_id, time) {

        return request.post("/ord/addord", {
            home_id,
            address,
            user_id,
            time
        });
    },
    // 功能: 查询房源的信息
    getroominfo(home_id, address,) {

        return request.get("/ord/checkroomid", {
            params: {
                home_id, address
            }
        });
    },
    // 功能:取消预约
    changeStates(home_id, user_id, state) {
        return request.put("/ord/upinput", {
            home_id, user_id, state
        });
    },
    // 功能:取消预约
    Reappointment(home_id, user_id, state, time) {
        return request.put("/ord/upinputs", {
            home_id, user_id, state, time
        });
    },
}