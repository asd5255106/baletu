import React from "react";
//引入样式
import "../../assets/css/gongyu.css"
//引入方法
import gongyuApi from "../../api/gongyuApi"
// 引入公共头部组件
import Comheader from "../../components/Comheader"
// 引入渲染列表组件
import Renderlist from "../../components/Renderlist"
// 6.到组件内，接收store的数据
import { connect } from "react-redux";

/*
    公寓
*/

class GongyuPage extends React.Component {
    constructor() {
        super();
        this.state = {
            type: "gg",
            gglist: [],//广告的列表
        };
    }
    async getRenderlist(address) {
        try {
            let p = await gongyuApi.getGyGglist(address);

            if (p.data.flag) {
                // console.log(p.data.data)
                let arr = p.data.data
                arr.forEach(item => {
                    // console.log(item)
                    let roominfo = []
                    item.inf1 = JSON.parse(item.inf1)
                    item.inf2 = JSON.parse(item.inf2)
                    item.inf3 = JSON.parse(item.inf3)
                    if (item.inf1) {
                        roominfo.push(item.inf1)
                    }
                    if (item.inf2) {
                        roominfo.push(item.inf2)
                    }
                    if (item.inf3) {
                        roominfo.push(item.inf3)
                    }
                    // console.log(roominfo)
                    item.roominfo = roominfo
                })
                // console.log(arr)
                let { gglist } = this.state;
                gglist = arr
                this.setState({
                    gglist
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    componentDidMount() {   // 一进来就获取数据
        // console.log(sessionStorage.getItem("nowCity"));//{"address":"sz","city":"深圳"}
        // let arr = JSON.parse(sessionStorage.getItem("nowCity"));
        // console.log(arr)
        // // 一进来就获取数据
        this.getRenderlist(this.props.state.selectCity.address);

    }
    render() {
        // console.log(this.state.gglist)
        return (
            <div>
                <div data-v-cda44fd4="" id="app">
                    <div data-v-12f6b292="" data-v-cda44fd4="" className="apartment">
                        <div data-v-6262a41f="" data-v-12f6b292="" className="topBack" style={{ width: 1 * 50, height: 1.1 * 50, borderRadius: 1 * 50 }}>
                            <p data-v-6262a41f="" onClick={() => { window.scrollTo(0, 0) }}><a href="###" style={{ color: "#fff" }}>回到顶部</a></p>
                        </div>

                        <Comheader></Comheader>

                        <div data-v-72a9c117="" data-v-12f6b292="">
                            <div data-v-72a9c117="" className="banner">
                                <div data-v-72a9c117="" className="vux-slider" style={{ width: "100%" }}>
                                    <div className="vux-swiper" style={{ height: "150.4px" }}>
                                        <div data-v-72a9c117="" className="vux-swiper-item swiper-demo-img"
                                            style={{ transform: "translate3d(0px, 0px, 0px)", transition: "all 300ms ease 0s" }}><a
                                                data-v-72a9c117="" href="https://m.baletu.com/bj/store?id=1542"><img
                                                    data-v-72a9c117=""
                                                    src="https://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/189/oss_5a5cad25c093b.png"
                                                    alt="北京品牌公寓页面" style={{ width: "100%", height: "100%" }} /></a></div>
                                    </div>
                                    <div className="vux-indicator vux-indicator-center" style={{ display: "none" }}><a href="###"><i
                                        className="vux-icon-dot active"></i></a></div>
                                </div>
                            </div>
                        </div>
                        {this.state.gglist && this.state.gglist.length > 0 && this.state.gglist.map(item => {
                            return <div data-v-12f6b292="" className="unitStore" key={item.id}>
                                <div data-v-12f6b292="" className="unitStore-title">
                                    <div data-v-12f6b292="" className="store-logo"><img data-v-12f6b292=""
                                        src={item.logo} alt="" /></div>
                                    <div data-v-12f6b292="" className="store-mes">
                                        <h2 data-v-12f6b292="">
                                            {item.shop}
                                            <span data-v-12f6b292=""></span></h2>
                                        <p data-v-12f6b292="">{item.adress} </p>
                                    </div>
                                    <div data-v-12f6b292="" className="store-link">进店</div>
                                </div>
                                <ul data-v-12f6b292="" className="unitList">
                                    {item.roominfo && item.roominfo.length > 0 && item.roominfo.map(ele => {
                                        // console.log(ele)
                                        return <li data-v-12f6b292="" key={ele}>
                                            <div data-v-12f6b292="" className="unitList-img"><img data-v-12f6b292=""
                                                src={ele[0]}
                                                alt="" /></div>
                                            <h2 data-v-12f6b292="">{ele[1]}</h2>
                                            <h3 data-v-12f6b292="">{ele[2]}</h3>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        })}
                        {/* 房间列表 */}
                        <div data-v-12f6b292="" className="houses">
                            <div data-v-65f3aa72="" data-v-12f6b292="" className="shaixuan-wrapper">
                                <p data-v-65f3aa72="" className="houses-title">精品房型推荐</p>
                                <div data-v-65f3aa72="" id="shaixuan" className="shaixuan">
                                    <div data-v-65f3aa72="" className="tab-wrapper clearfix">
                                        <div data-v-65f3aa72="" className="tab"><span data-v-65f3aa72="" className="tab-text">地铁</span>
                                            <span data-v-65f3aa72="" className="tab-icon"></span></div>
                                        <div data-v-65f3aa72="" className="tab"><span data-v-65f3aa72="" className="tab-text">区域</span>
                                            <span data-v-65f3aa72="" className="tab-icon"></span></div>
                                        <div data-v-65f3aa72="" className="tab"><span data-v-65f3aa72="" className="tab-text">租金</span>
                                            <span data-v-65f3aa72="" className="tab-icon"></span></div>
                                        <div data-v-65f3aa72="" className="tab"><span data-v-65f3aa72="" className="tab-text">更多</span>
                                            <span data-v-65f3aa72="" className="tab-icon"></span></div>
                                    </div>
                                    <div data-v-65f3aa72="" className="options">
                                        <div data-v-65f3aa72="" className="option ditie clearfix" style={{ display: "none" }}>
                                            <ul data-v-65f3aa72="">
                                                <li data-v-65f3aa72="" className="left-active">全部</li>
                                                <li data-v-65f3aa72="" className="">1号线</li>
                                                <li data-v-65f3aa72="" className="">2号线</li>
                                                <li data-v-65f3aa72="" className="">4号线大兴线</li>
                                                <li data-v-65f3aa72="" className="">5号线</li>
                                                <li data-v-65f3aa72="" className="">6号线</li>
                                                <li data-v-65f3aa72="" className="">8号线</li>
                                                <li data-v-65f3aa72="" className="">10号线</li>
                                                <li data-v-65f3aa72="" className="">13号线</li>
                                                <li data-v-65f3aa72="" className="">14号线西段</li>
                                                <li data-v-65f3aa72="" className="">15号线</li>
                                                <li data-v-65f3aa72="" className="">八通线</li>
                                                <li data-v-65f3aa72="" className="">机场线</li>
                                                <li data-v-65f3aa72="" className="">昌平线</li>
                                                <li data-v-65f3aa72="" className="">亦庄线</li>
                                                <li data-v-65f3aa72="" className="">房山线</li>
                                                <li data-v-65f3aa72="" className="">14号线东段</li>
                                                <li data-v-65f3aa72="" className="">7号线</li>
                                                <li data-v-65f3aa72="" className="">9号线</li>
                                                <li data-v-65f3aa72="" className="">16号线</li>
                                                <li data-v-65f3aa72="" className="">西郊线</li>
                                                <li data-v-65f3aa72="" className="">燕房线</li>
                                                <li data-v-65f3aa72="" className="">S1线</li>
                                            </ul>
                                            <ul data-v-65f3aa72="" className="potion-right-list">
                                                <li data-v-65f3aa72="" className="right-active" style={{ display: "none" }}>全部</li>
                                            </ul>
                                        </div>
                                        <div data-v-65f3aa72="" className="option quyu clearfix" style={{ display: "none" }}>
                                            <ul data-v-65f3aa72="">
                                                <li data-v-65f3aa72="" className="left-active">全部</li>
                                                <li data-v-65f3aa72="" className="">朝阳</li>
                                                <li data-v-65f3aa72="" className="">海淀</li>
                                                <li data-v-65f3aa72="" className="">东城</li>
                                                <li data-v-65f3aa72="" className="">西城</li>
                                                <li data-v-65f3aa72="" className="">丰台</li>
                                                <li data-v-65f3aa72="" className="">通州</li>
                                                <li data-v-65f3aa72="" className="">石景山</li>
                                                <li data-v-65f3aa72="" className="">房山</li>
                                                <li data-v-65f3aa72="" className="">昌平</li>
                                                <li data-v-65f3aa72="" className="">大兴</li>
                                                <li data-v-65f3aa72="" className="">顺义</li>
                                                <li data-v-65f3aa72="" className="">密云</li>
                                                <li data-v-65f3aa72="" className="">怀柔</li>
                                                <li data-v-65f3aa72="" className="">延庆</li>
                                                <li data-v-65f3aa72="" className="">平谷</li>
                                                <li data-v-65f3aa72="" className="">门头沟</li>
                                            </ul>
                                            <ul data-v-65f3aa72="" className="potion-right-list">
                                                <li data-v-65f3aa72="" className="right-active" style={{ display: "none" }}>全部</li>
                                            </ul>
                                        </div>
                                        <div data-v-65f3aa72="" className="option zujin" style={{ display: "none" }}>
                                            <ul data-v-65f3aa72="">
                                                <li data-v-65f3aa72="" className="left-active">不限</li>
                                                <li data-v-65f3aa72="" className="">1500元以下</li>
                                                <li data-v-65f3aa72="" className="">1500-2000元</li>
                                                <li data-v-65f3aa72="" className="">2000-3000元</li>
                                                <li data-v-65f3aa72="" className="">3000-4000元</li>
                                                <li data-v-65f3aa72="" className="">4000-5000元</li>
                                                <li data-v-65f3aa72="" className="">5000元以上</li>
                                            </ul>
                                        </div>
                                        <div data-v-65f3aa72="" className="option gengduo clearfix" style={{ display: "none" }}>
                                            <ul data-v-65f3aa72="">
                                                <li data-v-65f3aa72="" className="left-active">排序</li>
                                                <li data-v-65f3aa72="" className="">特色</li>
                                            </ul>
                                            <ul data-v-65f3aa72="" className="potion-right-list">
                                                <li data-v-65f3aa72="" className="right-active">默认排序</li>
                                                <li data-v-65f3aa72="" className="">最新上架时间</li>
                                                <li data-v-65f3aa72="" className="">租金从低到高</li>
                                                <li data-v-65f3aa72="" className="">租金从高到低</li>
                                                <li data-v-65f3aa72="" className="">面积从小到大</li>
                                                <li data-v-65f3aa72="" className="">面积从大到小 </li>
                                            </ul>
                                            <ul data-v-65f3aa72="" className="potion-right-list" style={{ display: "none" }}>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">月付</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">新上架</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">近地铁</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">朝南</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">带阳台</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">精装</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">独立厨房</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">智能电表</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">家电全配</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">电梯房</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">非一楼</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">全网底价</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">阳光收费</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">精品房型</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">品牌优选</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">平台认证</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72="" className="clearfix"><span data-v-65f3aa72="">必看好房</span> <span
                                                    data-v-65f3aa72="" className="tese-checkbox-icon"></span></li>
                                                <li data-v-65f3aa72=""></li>
                                            </ul>
                                            <div data-v-65f3aa72="" className="tese-btns clearfix" style={{ display: "none" }}><span
                                                data-v-65f3aa72="" className="tese-btn-clean">清空</span> <span data-v-65f3aa72=""
                                                    className="tese-btn-confirm">确认</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div data-v-65f3aa72="" className="shaixuan-mask" style={{ display: "none" }}></div>
                            </div>
                            <div data-v-12f6b292="" className="houses-list">
                                <ul data-v-12f6b292="">
                                    <Renderlist msg={"公寓"}></Renderlist>
                                    {/* <li data-v-12f6b292="" className="houses-item">
                                        <div data-v-57b69ae6="" data-v-12f6b292="" className="house-card">
                                            <div data-v-57b69ae6="" className="base-info">
                                                <div data-v-57b69ae6="" className="main-photo">
                                                    <div data-v-57b69ae6="" className="main-image"
                                                        style={{ backgroundImage: "url(https://cdn.baletoo.cn/Uploads/housephoto/6600/6599136/oss_5e830c8c6f6e0.jpg@!330_260)" }}>
                                                    </div>

                                                    <div data-v-57b69ae6="" className="house-logo"><img data-v-57b69ae6=""
                                                        src="https://js.baletoo.cn/Public/app/house_list/brand@3x.png" alt=""
                                                        className="img" /></div>
                                                </div>
                                                <div data-v-57b69ae6="" className="detail">
                                                    <p data-v-57b69ae6="" className="title">
                                                        <span data-v-57b69ae6="">公寓 泊寓北京空港店 </span></p>
                                                    <p data-v-57b69ae6="" className="room-info">mini房型16㎡·众多朝向</p>
                                                    <div data-v-57b69ae6="" className="trafic">
                                                        <div data-v-57b69ae6="" className="icon"></div>
                                                        <div data-v-57b69ae6="" className="text">顺义-顺义城区</div>
                                                    </div>
                                                    <p data-v-57b69ae6="" className="labels"><span data-v-57b69ae6=""
                                                        className="label">独卫</span><span data-v-57b69ae6="" className="label">新上架</span>
                                                    </p>
                                                    <div data-v-57b69ae6="" className="price"><span data-v-57b69ae6=""
                                                        className="bold">1350</span>元</div>
                                                    <ul data-v-57b69ae6="" className="activity-info"></ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                                <div data-v-12f6b292="" className="no-house" style={{ display: "none" }}>未找到对应公寓哦~</div>
                                <div data-v-12f6b292="" style={{ width: "100%", height: "1px" }}></div>
                                <p data-v-12f6b292="" className="vux-divider" style={{ paddingBottom: "40px", display: "block" }}>我是有底线的</p>
                            </div>
                        </div>
                        <div data-v-27e3feca="" data-v-12f6b292="" className="loading-pop" style={{ display: "none" }}>
                            <div data-v-27e3feca=""></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        state
    }
})(GongyuPage);