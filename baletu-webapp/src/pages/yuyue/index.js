import React from "react";
//引进头部样式
import "../../assets/css/same.css"
import "../../assets/css/yuyue.css"
import { Button } from 'antd-mobile';
// 声明式跳转
import { Link } from 'react-router-dom';
//获取封装的工具包
import { getCookie } from "../../utils/auth";
//引用AXIOS的请求网络封装
import yuyueApi from "../../api/yuyueApi"
/** 客户端用户预约管理*/

class YuYue extends React.Component {
    constructor() {
        super()
        this.state = {
            yuyuelist: [],
            objlist: []
        }
    }
    utiled(index, state) {
        let ref = this.state.yuyuelist
        let home_id = ref[index].home_id
        let user_id = ref[index].user_id
        let d = new Date();
        let time = d.toLocaleDateString();
        let p = yuyueApi.Reappointment(home_id, user_id, state, time)
        p.then(res => {
            // console.log(res)
            this.fell()
        })
    }
    changeTime(ev, index) {
        let state = "预约中"
        this.utiled(index, state)
    }
    changeState(ev, index) {
        // console.log(ev.target, index)
        // let ref = this.state.yuyuelist
        // let state = "取消预约"
        // let home_id = ref[index].home_id
        // let user_id = ref[index].user_id
        // let p = yuyueApi.changeStates(home_id, user_id, state)
        // p.then(res => {
        //     console.log(res)
        //     this.fell()
        // })
        let state = "取消预约"
        this.utiled(index, state)
    }
    //渲染数据
    fell() {
        let username = getCookie("baletu-webapp-user") ? JSON.parse(getCookie("baletu-webapp-user")).username : ""
        let p = yuyueApi.getYuyuellist(username)
        p.then(res => {
            let arr = res.data.data
            for (var i = 0; i < arr.length; i++) {
                let obj = arr[i]
                let s = yuyueApi.getroominfo(arr[i].home_id, arr[i].address)
                let st;
                s.then(ret => {
                    st = ret.data.data[0]
                    obj.info = st.roomInfo
                    obj.text = st.text
                    obj.img = st.img
                })
            }
            setTimeout(() => {
                this.setState({
                    yuyuelist: arr
                })
            }, 1000)

        }).catch(() => {

        })
    }
    componentDidMount() {
        this.fell()
    }
    render() {
        // const ButtonExample = () => (
        //     <WingBlank>
        //         <div className="button">
        //             <Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={(ev) => this.changeTime(ev)}>修改预约时间</Button>
        //             <Button type="primary" inline size="small" style={{ marginRight: '4px', backgroundColor: "#58bc58" }} onClick={(ev) => this.changeState(ev)}>取消</Button>
        //         </div>
        //     </WingBlank>
        // );

        return (
            <div>
                {/* 头部导航栏 */}
                <div className="search-header clearfix" >
                    {/* <div data-v-4cd80081="" className="search-header-home fl">
                        <img data-v-4cd80081=""
                            src="//js.baletoo.cn/static/m/static/images/home.png" alt="" />
                    </div>
                    <div data-v-4cd80081="" className="search-header-my fr">
                        <img data-v-4cd80081=""
                            src="//js.baletoo.cn/static/m/static/images/my.png" alt="" />
                    </div> */}

                    <a href="/">
                        <div data-v-4cd80081="" className="search-header-home fl">
                            <img data-v-4cd80081=""
                                src="//js.baletoo.cn/static/m/static/images/home.png" alt="" />
                        </div>
                    </a>
                    <Link to="/my">
                        <div data-v-4cd80081="" className="search-header-my fr">
                            <img data-v-4cd80081=""
                                src="//js.baletoo.cn/static/m/static/images/my.png" alt="" />
                        </div>
                    </Link>

                    <div className="shiyou">预约管理</div>
                    <div data-v-4cd80081="" className="find-house-map"></div>
                </div>
                {/* 用户预定 */}
                <div className="yu-cont">
                    <h2 className="yu-title">您预约以下房源</h2>
                    <ul>
                        {this.state.yuyuelist && this.state.yuyuelist.length > 0 && this.state.yuyuelist.map((item, index) => {

                            return <li key={item.home_id}>
                                <div className="yu-img">
                                    <img src={item.img} alt="" />
                                </div>
                                <div className="yu-right">
                                    <h1>{item.title} </h1>
                                    <div className="roominfo">{item.info}</div>
                                    <div className="roomaddress"><span>{item.address}</span> {item.text.slice()} </div>
                                    <div className="roomprice">{item.price}元</div>
                                    <div className={`roomstate  ${item.state === "取消预约" ? "roomstate-quxiao" : ""}`} >{item.state}</div>
                                    <div className="roomdata">预约时间：<span>{item.data} </span></div>
                                </div>

                                {/* <ButtonExample /> */}
                                <div className="button">
                                    <Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={(ev) => this.changeTime(ev, index)}>重新预约</Button>
                                    <Button type="primary" inline size="small" style={{ marginRight: '4px', backgroundColor: "#58bc58" }} onClick={(ev) => this.changeState(ev, index)}>取消</Button>
                                </div>
                            </li>
                        })
                        }
                        <li style={{ display: this.state.yuyuelist.length > 0 ? "none" : "block" }}>
                            <h2 >暂无数据</h2>
                        </li>


                    </ul>
                </div>
            </div>

        )
    }
}

export default YuYue



