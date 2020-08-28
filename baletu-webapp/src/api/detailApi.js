import request from "../utils/request";
import request2 from "../utils/request2"

export default {
    // 功能: 获取详情页数据
    getDetaillist(home_id, address) {
        // console.log(page, pagesize, address);
        return request.get("/good/checkxq", {
            params: {
                home_id, address
            }
        });
    },

    // 功能: 根据地址获取地址的坐标
    getAddress(address) {
        let output = "json";
        let ak = "GKxdd53XchMiHQj7ora95mSXnEWPIi2I";
        return request2.get("/geocoding/v3/", {
            params: {
                address,
                output,
                ak
            }
        })
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
    // 功能: 查询是否预约过
    checkYue(home_id, address, user_id) {
        // console.log(page, pagesize, address);
        return request.get("/ord/checkordid", {
            params: {
                home_id, address, user_id
            }
        });
    },
}