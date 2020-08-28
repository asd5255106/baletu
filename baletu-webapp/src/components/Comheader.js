import React from "react";
// 6.到组件内，接收store的数据
import { connect } from "react-redux";
import actions from "../store/actions";
// 声明式跳转
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';

/* 
    公共头部
*/

class Comheader extends React.Component {
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
    }

    // 功能: 显示搜索页
    showSearchPage() {
        this.props.dispatch(actions.showSearch.showSearch({ show: true }));
    }

    showNone() {
        Toast.info("暂无此功能", 1);
    }

    render() {
        // console.log(this.props);

        return (
            <div style={{zIndex: "9999"}} data-v-4cd80081="" className="search-header clearfix">
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
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">南京</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">苏州</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">杭州</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">成都</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">大连</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">天津</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">重庆</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">武汉</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">西安</li>
                                    <li onClick={this.showNone.bind(this)} data-v-70b2d22c="">郑州</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={this.showSearchPage.bind(this)} data-v-4cd80081="" className="search-header-input">
                    <img data-v-4cd80081=""
                        src="//js.baletoo.cn/static/m/static/images/fangdajin.png" alt="" />输入区域，小区搜索房源</div>
                <div data-v-4cd80081="" className="find-house-map"></div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        state
    }
})(Comheader);