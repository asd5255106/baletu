import React from "react";
//引进头部样式
import "../../assets/css/same.css"
import "../../assets/css/shiyou.css"
// 6.到组件内，接收store的数据
import { connect } from "react-redux";
import shiyouApi from "../../api/shiyouApi"
import actions from "../../store/actions";
// 声明式跳转
import { Link } from 'react-router-dom';

/*
    室友
*/

class ShiyouPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showSelect: false,
            citylist: [
                {
                    address: "bj",
                    city: "北京"
                },
                {
                    address: "sh",
                    city: "上海"
                },
                {
                    address: "sz",
                    city: "深圳"
                },
                {
                    address: "gz",
                    city: "广州"
                }
            ],
            renderList: [],
            page: 1,
            pagesize: 10,
            type: "fingyou",
            goDown: 0
        }
    }

    // 功能: 弹出选择城市框
    showSelectCity() {
        let { showSelect } = this.state;
        showSelect = true;
        this.setState({
            showSelect
        });
    }

    // 功能: 从选择城市框返回首页
    goBack() {
        let { showSelect } = this.state;
        showSelect = false;
        this.setState({
            showSelect
        });
    }

    // 功能: 选中城市
    choseCity(nowCity) {
        // console.log(nowCity);
        /*
            触发action的方法:
                this.props.dispatch({})
                * type: 必填，属性名必须是type.value值写成大写
                * payload : 提交载荷； 数据，这个属性名可以任取
        */
        // 把当前城市存到loaclStorage中
        sessionStorage.setItem("nowCity", JSON.stringify(nowCity));
        // this.props.dispatch({ type: nowCity.address, data: { nowCity } });
        this.props.dispatch(actions.selectCity.selectCity(nowCity));
        this.goBack();
        window.location.reload();
    }
    async getRenderlist(address) {
        try {
            let p = await shiyouApi.getShiyoulist(address);

            if (p.data.flag) {
                let { renderList } = this.state;
                renderList = p.data.data;
                this.setState({
                    renderList
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    componentDidMount() {   // 一进来就获取数据
        // console.log(sessionStorage.getItem("nowCity"));//{"address":"sz","city":"深圳"}
        // console.log(this.props.state.selectCity.address);
        // let arr = JSON.parse(sessionStorage.getItem("nowCity"));
        // console.log(contname)//gzfingyou
        // 一进来就获取数据
        this.getRenderlist(this.props.state.selectCity.address);

    }
    render() {
        // console.log(this.state.renderList)
        return (
            <div>
                <div className="search-header clearfix" >

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
                    <div data-v-70b2d22c="" data-v-4cd80081="" className="tabCity headerCity">
                        <div onClick={this.showSelectCity.bind(this)} data-v-70b2d22c="" className="topSelect">
                            <span data-v-70b2d22c=""
                                className="city-select city-select-text">{this.props.state.selectCity.city}</span>
                            <span data-v-70b2d22c=""
                                className={this.state.showSelect ? "city-select city-select-bg showSelectArrow" : "city-select city-select-bg"}>　　</span>
                        </div>
                        <div data-v-70b2d22c="" className={"option-box " + (this.state.showSelect ? "showSelect" : "hideSelect")}>
                            <div data-v-70b2d22c="" className="city-option">
                                <div data-v-70b2d22c="" className="selectCity-title">
                                    <img data-v-70b2d22c=""
                                        onClick={this.goBack.bind(this)}
                                        src="//js.baletoo.cn/static/m/static/images/left.png" alt="返回"
                                        className="left-icon" />
                                    选择城市
                                </div>
                                <div data-v-70b2d22c="" className="cityList">
                                    <h2 data-v-70b2d22c="">当前城市</h2>
                                    <ul data-v-70b2d22c="">
                                        <li onClick={this.choseCity.bind(this, this.props.state.selectCity)} data-v-70b2d22c="">{this.props.state.selectCity.city}</li>
                                    </ul>
                                </div>
                                <div data-v-70b2d22c="" className="cityList">
                                    <h2 data-v-70b2d22c="">热门城市</h2>
                                    <ul data-v-70b2d22c="">
                                        {this.state.citylist.map(item => {
                                            return <li key={item.address} data-v-70b2d22c="" onClick={this.choseCity.bind(this, item)}>{item.city}</li>
                                        })}
                                        <li data-v-70b2d22c="">南京</li>
                                        <li data-v-70b2d22c="">苏州</li>
                                        <li data-v-70b2d22c="">杭州</li>
                                        <li data-v-70b2d22c="">成都</li>
                                        <li data-v-70b2d22c="">大连</li>
                                        <li data-v-70b2d22c="">天津</li>
                                        <li data-v-70b2d22c="">重庆</li>
                                        <li data-v-70b2d22c="">武汉</li>
                                        <li data-v-70b2d22c="">西安</li>
                                        <li data-v-70b2d22c="">郑州</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shiyou">找室友专区</div>
                    <div data-v-4cd80081="" className="find-house-map"></div>
                </div>
                {/* 选项 */}
                <div className="tab-out">
                    <div className="tab-wrapper">
                        <div className="tab-box"><span className="tab-text">地铁</span> <span
                            className="tab-icon"></span></div>
                        <div className="tab-box"><span className="tab-text">租金</span> <span
                            className="tab-icon"></span></div>
                    </div>
                    <div className="options">
                        <div className="ditie-options" style={{ display: "none" }}>
                            <ul >
                                <li className="item-left  ditie-item-left-active">全部</li>
                                <li className="item-left">1号线</li>
                                <li className="item-left">2号线</li>
                                <li className="item-left">3号线</li>
                                <li className="item-left">4号线</li>
                                <li className="item-left">5号线</li>
                                <li className="item-left">6号线</li>
                                <li className="item-left">7号线</li>
                                <li className="item-left">8号线</li>
                                <li className="item-left">9号线</li>
                                <li className="item-left">10号线</li>
                                <li className="item-left">11号线</li>
                                <li className="item-left">12号线</li>
                                <li className="item-left">13号线</li>
                                <li className="item-left">16号线</li>
                                <li className="item-left">17号线</li>
                                <li className="item-left">2号线东延线</li>
                            </ul>
                        </div>
                        <div className="tab-zujin" style={{ display: "none" }}>
                            <ul className="zujin-options">
                                <li className="zujin-option zujin-option-active">不限</li>
                                <li className="zujin-option">1500元以下</li>
                                <li className="zujin-option">1500-2000元</li>
                                <li className="zujin-option">2000-3000元</li>
                                <li className="zujin-option">3000-4000元</li>
                                <li className="zujin-option">4000-5000元</li>
                                <li className="zujin-option">5000元以上</li>
                            </ul>
                            <div className="zujin-price clearfix"><span
                                className="zujin-price-zidingyi">自定义价格</span> <span
                                    className="zujin-price-danwei">（单位：元）</span> <span
                                        className="zujin-price-confirm">确定</span></div> <span
                                            className="range-price">不限</span>
                            <div className="range-box">
                                <div className="bar-outer">
                                    <div className="bar-inner-limit">
                                        <div className="bar-inner"></div>
                                    </div> <span className="range-icon range-icon-left"></span> <span
                                        className="range-icon range-icon-right"></span>
                                </div>
                            </div>
                            <ul className="range-ruler">
                                <li className="ruler-item">0　</li>
                                <li className="ruler-item">1000</li>
                                <li className="ruler-item">2000</li>
                                <li className="ruler-item">3000</li>
                                <li className="ruler-item">4000</li>
                                <li className="ruler-item">不限</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="filter-mask" style={{ display: "none" }}></div>
                <div className="list">
                    {this.state.renderList && this.state.renderList.length > 0 && this.state.renderList.map(item => {
                        // console.log(JSON.parse(item.roominf)[0])
                        return <div key={item.room_id}>
                            <div className="house-card">
                                <div className="card-info clearfix">
                                    <div className="list-box-left">
                                        <div className="card-img">
                                            <img src={item.imgsrc} alt="" className="card-img-house" />
                                        </div>

                                    </div>

                                    <ul className="card-text">
                                        <li>
                                            <div className="card-text-name">{item.title} </div>
                                            <div className="card-text-price">{item.price} </div>
                                        </li>
                                        <li className="card-text-info">
                                            <span><i className="icon iconType-dj"><img src="https://js.baletoo.cn/static/m/static/images/find_roommate_singleRoom.png" alt="" /> </i>{JSON.parse(item.roominf)[0]} </span>
                                            <span> <i className="icon iconRep-bx"><img src="https://js.baletoo.cn/static/m/static/images/find_roommate_people.png" alt="" /></i>{JSON.parse(item.roominf)[1]}</span>
                                            <span><i className="icon iconDate"><img src="https://js.baletoo.cn/static/m/static/images/find_roommate_checkIn.png" alt="" /></i>{JSON.parse(item.roominf)[2]}</span>
                                        </li>

                                        <li className="card-text-subway">{item.adress}</li>
                                        <li className="card-text-service"><span>{item.zhuangzu}</span>
                                            <div className="text-info-day">{item.shijian}</div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    })}


                    <div className="noRmmeg" style={{ display: "none" }}>
                        没有合适的帖子哦,看看其他的吧~ </div>

                </div>
                {/* <div style={{ width: " 100%", height: 1 * 50 }} ></div> */}
                <p className="vux-divider" style={{ paddingBottom: "40px" }}>我是有底线的</p>

            </div>
        );
    }
}

export default connect((state) => {
    return {
        state
    }
})(ShiyouPage);