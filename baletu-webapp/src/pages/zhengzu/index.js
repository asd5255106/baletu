import React from "react";
// 引入公共头部组件
import Comheader from "../../components/Comheader"
// 引入渲染列表组件
import Renderlist from "../../components/Renderlist"
// 引入回到顶部组件
import Backtop from "../../components/Backtop"
// 引入搜索页组件
import SearchPage from "../../components/SearchPage"
// 到组件内，接收store的数据
import { connect } from "react-redux";
// 引入弹出排序组件
import { ActionSheet } from 'antd-mobile';
import { Toast } from 'antd-mobile';

/*
    整租
*/

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

class ZhengzuPage extends React.Component {
    constructor() {
        super();
        this.state = {
            clicked: 'none',
            btnIndex: 0,
            sort: "",
            opt: "",
            showFilter: false,
            huxing: [
                {
                    title: "不限",
                    data: ["不限"]
                },
                {
                    title: "合租",
                    data: ["不限", "一户合租", "二户合租", "三户合租", "四户合租"]
                },
                {
                    title: "整租",
                    data: ["不限", "一室", "二室", "三室", "四室及以上"]
                },
                {
                    title: "公寓",
                    data: ["不限", "一室", "二室", "三室及以上"]
                }
            ],
            nowHuxing: 0,
            currentHuxing: "整租"
        };
    }

    // 选择户型发送请求
    choseHuxing() {
        let { currentHuxing, showFilter } = this.state;
        currentHuxing = this.state.huxing[this.state.nowHuxing].title;
        if (currentHuxing === "不限") {
            currentHuxing = "整租"
        }
        showFilter = false;
        // 修改户型
        this.setState({
            currentHuxing,
            showFilter
        })
    }

    // 点击户型改变户型
    changeHuxing(index) {
        let { nowHuxing } = this.state;
        nowHuxing = index;
        this.setState({
            nowHuxing
        })
    }

    // 价格排序
    showActionSheet = () => {
        const BUTTONS = ['默认排序', '租金从低到高排序', '租金从高到低排序', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: 3,
            destructiveButtonIndex: this.state.btnIndex,
            // title: 'title',
            message: '排序方式',
            maskClosable: true,
            'data-seed': 'logId',
            wrapProps,
        },
            (buttonIndex) => {
                // console.log(buttonIndex);
                if (buttonIndex === 3) {
                    buttonIndex = this.state.btnIndex
                }
                // 更新排序方式
                let sort = "";
                let opt = "";
                if (buttonIndex === 0) {
                    sort = ""
                    opt = ""
                } else if (buttonIndex === 1) {
                    sort = "ASC"
                    opt = "price"
                } else if (buttonIndex === 2) {
                    sort = "DESC"
                    opt = "price"
                }
                this.setState({
                    clicked: BUTTONS[buttonIndex],
                    btnIndex: buttonIndex,
                    sort,
                    opt
                });
            });
    }

    // 显示过滤功能
    showSort() {
        let { showFilter } = this.state;
        showFilter = !showFilter;
        this.setState({
            showFilter
        })
    }

    render() {
        // console.log(this.props);

        return (
            <div>
                <div data-v-cda44fd4="" id="app">
                    {/* 搜索页组件 */}
                    <SearchPage></SearchPage>
                    <div style={{ display: this.props.state.showSearch.show ? "none" : "block" }} data-v-4cd80081="" data-v-cda44fd4="" className="find-house skeleton">
                        {/* 头部公共组件 */}
                        <Comheader></Comheader>
                        {/* 回到顶部组件 */}
                        <Backtop class={".findhouse-list-wrapper"}></Backtop>
                        <div data-v-4cd80081="" className="tab-out" style={{ position: this.state.showFilter ? "fixed" : "static", top: "0px" }}>
                            <div data-v-4cd80081="" className="tab-wrapper">
                                <div onClick={this.showSort.bind(this)} data-v-4cd80081="" className="tab"><span data-v-4cd80081="" className="tab-text">位置</span>
                                    <span data-v-4cd80081="" className="tab-icon"></span></div>
                                <div onClick={this.showSort.bind(this)} data-v-4cd80081="" className="tab"><span data-v-4cd80081="" className="tab-text">租金</span>
                                    <span data-v-4cd80081="" className="tab-icon"></span></div>
                                <div onClick={this.showSort.bind(this)} data-v-4cd80081="" className="tab tab-text-active"><span data-v-4cd80081="" className="tab-text">{this.state.currentHuxing}</span>
                                    <span data-v-4cd80081="" className="tab-icon"></span></div>
                                <div onClick={this.showSort.bind(this)} data-v-4cd80081="" className="tab"><span data-v-4cd80081="" className="tab-text">更多</span>
                                    <span data-v-4cd80081="" className="tab-icon"></span></div>
                            </div>
                            <div data-v-4cd80081="" className="options-wrapper">
                                <div data-v-4cd80081="" className="tab-weizhi" style={{ display: "none" }}>
                                    <div data-v-4cd80081="" className="weizhi-box">
                                        <div data-v-4cd80081="" className="weizhi-quyu"><span data-v-4cd80081=""
                                            className="weizhi-tab-selected">区域</span></div>
                                        <div data-v-4cd80081="" className="weizhi-ditie"><span data-v-4cd80081=""
                                            className="">地铁</span>
                                        </div>
                                    </div>
                                    <div data-v-4cd80081="" className="weizhi-options">
                                        <ul data-v-4cd80081="" className="options-weizhi">
                                            <li data-v-4cd80081=""
                                                className="options-weizhi-item weizhi-item-left weizhi-item-left-active">全部
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">浦东
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">宝山
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">闵行
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">松江
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">嘉定
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">普陀
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">徐汇
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">杨浦
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">长宁
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">虹口
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">青浦
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">静安
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">黄浦
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">奉贤
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">金山
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">崇明
                                    </li>
                                        </ul>
                                        <ul data-v-4cd80081="" className="options-weizhi options-weizhi-right">
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right right-active"
                                                style={{ display: "none" }}>全部
                                    </li>
                                        </ul>
                                    </div>
                                    <div data-v-4cd80081="" className="weizhi-options" style={{ display: "none" }}>
                                        <ul data-v-4cd80081="" className="options-weizhi">
                                            <li data-v-4cd80081=""
                                                className="options-weizhi-item weizhi-item-left weizhi-item-left-active">全部
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">1号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">2号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">3号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">4号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">5号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">6号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">7号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">8号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">9号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">10号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">11号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">12号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">13号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">16号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">17号线
                                    </li>
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-left">2号线东延线
                                    </li>
                                        </ul>
                                        <ul data-v-4cd80081="" className="options-weizhi options-weizhi-right">
                                            <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right right-active"
                                                style={{ display: "none" }}>全部
                                    </li>
                                        </ul>
                                    </div>
                                </div>
                                <div data-v-4cd80081="" className="tab-zujin" style={{ display: "none" }}>
                                    <ul data-v-4cd80081="" className="zujin-options">
                                        <li data-v-4cd80081="" className="zujin-option zujin-option-active">不限</li>
                                        <li data-v-4cd80081="" className="zujin-option">
                                            1500元以下
                                </li>
                                        <li data-v-4cd80081="" className="zujin-option">
                                            1500-2000元
                                </li>
                                        <li data-v-4cd80081="" className="zujin-option">
                                            2000-3000元
                                </li>
                                        <li data-v-4cd80081="" className="zujin-option">
                                            3000-4000元
                                </li>
                                        <li data-v-4cd80081="" className="zujin-option">
                                            4000-5000元
                                </li>
                                        <li data-v-4cd80081="" className="zujin-option">
                                            5000元以上
                                </li>
                                    </ul>
                                    <div data-v-4cd80081="" className="zujin-price clearfix"><span data-v-4cd80081=""
                                        className="zujin-price-zidingyi">自定义价格</span> <span data-v-4cd80081=""
                                            className="zujin-price-danwei">（单位：元）</span> <span data-v-4cd80081=""
                                                className="zujin-price-confirm">确定</span></div> <span data-v-4cd80081=""
                                                    className="range-price">不限</span>
                                    <div data-v-4cd80081="" className="range-box">
                                        <div data-v-4cd80081="" className="bar-outer">
                                            <div data-v-4cd80081="" className="bar-inner-limit">
                                                <div data-v-4cd80081="" className="bar-inner"></div>
                                            </div> <span data-v-4cd80081="" className="range-icon range-icon-left"></span> <span
                                                data-v-4cd80081="" className="range-icon range-icon-right"></span>
                                        </div>
                                    </div>
                                    <ul data-v-4cd80081="" className="range-ruler">
                                        <li data-v-4cd80081="" className="ruler-item">0　</li>
                                        <li data-v-4cd80081="" className="ruler-item">1000</li>
                                        <li data-v-4cd80081="" className="ruler-item">2000</li>
                                        <li data-v-4cd80081="" className="ruler-item">3000</li>
                                        <li data-v-4cd80081="" className="ruler-item">4000</li>
                                        <li data-v-4cd80081="" className="ruler-item">不限</li>
                                    </ul>
                                </div>
                                <div data-v-4cd80081="" className="tab-huxing" style={{ display: this.state.showFilter ? "block" : "none" }}>
                                    <div data-v-4cd80081="" className="huxing-options">
                                        <ul data-v-4cd80081="" className="options-weizhi">
                                            {this.state.huxing.map((item, index) => {
                                                return <li key={index} onClick={this.changeHuxing.bind(this, index)} data-v-4cd80081="" className={this.state.nowHuxing === index ? "options-weizhi-item weizhi-item-left weizhi-item-left-active" : "options-weizhi-item weizhi-item-left"}>{item.title}</li>
                                            })}
                                        </ul>
                                        <ul data-v-4cd80081="" className="options-weizhi options-weizhi-right">
                                            {this.state.huxing[this.state.nowHuxing].data.map((item, index) => {
                                                return <li onClick={this.choseHuxing.bind(this)} key={index} data-v-4cd80081="" className="options-weizhi-item weizhi-item-right"
                                                    style={{ display: "block" }}>{item}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div data-v-4cd80081="" className="tab-gengduo" style={{ display: "none" }}>
                                    <div data-v-4cd80081="" className="gengduo-options gengduo-options-new">
                                        <div data-v-4cd80081="" className="title-new">特色</div>
                                        <div data-v-4cd80081="" className="content-new">
                                            <ul data-v-4cd80081="">
                                                <li data-v-4cd80081="" className="">月付</li>
                                                <li data-v-4cd80081="" className="">新上架</li>
                                                <li data-v-4cd80081="" className="">近地铁</li>
                                                <li data-v-4cd80081="" className="">主卧</li>
                                                <li data-v-4cd80081="" className="">朝南</li>
                                                <li data-v-4cd80081="" className="">独卫</li>
                                                <li data-v-4cd80081="" className="">带阳台</li>
                                                <li data-v-4cd80081="" className="">精装</li>
                                                <li data-v-4cd80081="" className="">独立厨房</li>
                                                <li data-v-4cd80081="" className="">智能电表</li>
                                                <li data-v-4cd80081="" className="">家电全配</li>
                                                <li data-v-4cd80081="" className="">电梯房</li>
                                                <li data-v-4cd80081="" className="">非一楼</li>
                                                <li data-v-4cd80081="" className="">转租</li>
                                                <li data-v-4cd80081="" className="">精品房型</li>
                                                <li data-v-4cd80081="" className="">品牌优选</li>
                                            </ul>
                                        </div>
                                        <div data-v-4cd80081="" className="title-new">保障</div>
                                        <div data-v-4cd80081="" className="content-new">
                                            <ul data-v-4cd80081="">
                                                <li data-v-4cd80081="" className="">全网底价</li>
                                                <li data-v-4cd80081="" className="">阳光收费</li>
                                                <li data-v-4cd80081="" className="">平台认证</li>
                                                <li data-v-4cd80081="" className="">必看好房</li>
                                            </ul>
                                        </div>
                                        <div data-v-4cd80081="">
                                            <div data-v-4cd80081="" className="btns-new">
                                                <div data-v-4cd80081="" className="btn-new btn-new-clean">清空</div>
                                                <div data-v-4cd80081="" className="btn-new btn-new-confirm">确认</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-v-4cd80081="" className="shortcut-filter">
                            <div onClick={() => {Toast.info("暂无此功能",1)}} data-v-4cd80081="" className="shortcut-wrapper">
                                <div data-v-4cd80081="" className="shortcut"><span data-v-4cd80081="" className="renzheng-icon"
                                    style={{ display: "none" }}></span>租金月付
                        </div>
                                <div data-v-4cd80081="" className="shortcut"><span data-v-4cd80081="" className="renzheng-icon"
                                    style={{ display: "none" }}></span>近地铁
                        </div>
                                <div data-v-4cd80081="" className="shortcut"><span data-v-4cd80081="" className="renzheng-icon"
                                    style={{ display: "none" }}></span>独卫
                        </div>
                                <div data-v-4cd80081="" className="shortcut"><span data-v-4cd80081="" className="renzheng-icon"
                                    style={{ display: "none" }}></span>朝南
                        </div>
                                <div data-v-4cd80081="" className="shortcut"><span data-v-4cd80081="" className="renzheng-icon"
                                    style={{ display: "none" }}></span>带阳台
                        </div>
                                <div data-v-4cd80081="" className="shortcut"><span data-v-4cd80081="" className="renzheng-icon"
                                    style={{ display: "none" }}></span>独立厨房
                        </div>
                            </div>
                        </div>
                        <div onClick={this.showActionSheet} data-v-4cd80081="" className="sort">
                            <p data-v-4cd80081="">排序</p>
                        </div>
                        <div data-v-4cd80081="" className="v-transfer-dom">
                            <div data-v-4cd80081=""
                                className="vux-popup-dialog vux-popup-bottom vux-popup-dialog vux-popup-dialog-htjnp"
                                style={{ height: "271px", zIndex: "1000", display: "none" }}>
                                <div data-v-4cd80081="" className="sortList">
                                    <ul data-v-4cd80081="" className="options-weizhi options-weizhi-right">
                                        <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right right-active">默认排序
                                </li>
                                        <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right clearfix">
                                            最新上架时间
                                </li>
                                        <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right clearfix">
                                            租金从低到高
                                </li>
                                        <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right clearfix">
                                            租金从高到低
                                </li>
                                        <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right clearfix">
                                            面积从小到大
                                </li>
                                        <li data-v-4cd80081="" className="options-weizhi-item weizhi-item-right clearfix">
                                            面积从大到小
                                </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => { this.setState({ showFilter: false }) }} data-v-4cd80081="" className="filter-mask" style={{ display: this.state.showFilter ? "block" : "none" }}></div>

                        <div data-v-4cd80081="" className="findhouse-list-wrapper">

                            <Renderlist msg={this.state.currentHuxing} sort={this.state.sort} opt={this.state.opt}></Renderlist>

                            <div data-v-4cd80081="" className="no-house"></div>
                            <div data-v-4cd80081="" style={{ width: "100%", height: "1px" }}></div>
                            <p data-v-4cd80081="" className="vux-divider" style={{ paddingBottom: "50px", display: "none" }}>我是有底线的</p>
                        </div>

                        <div data-v-4cd80081="" className="hot-search">
                            <div data-v-4cd80081="" className="hot-search-title">　房源热点　</div>
                            <ul data-v-4cd80081="" className="hot-search-content clearfix">
                                <li data-v-4cd80081=""><a data-v-4cd80081="" href="###">月付房源</a></li>
                                <li data-v-4cd80081=""><a data-v-4cd80081="" href="###">品牌公寓</a></li>
                                <li data-v-4cd80081=""><a data-v-4cd80081="" href="###">朝南主卧</a></li>
                                <li data-v-4cd80081=""><a data-v-4cd80081="" href="###">独卫单间</a></li>
                                <li data-v-4cd80081=""><a data-v-4cd80081="" href="###">千元好房</a></li>
                                <li data-v-4cd80081=""><a data-v-4cd80081="" href="###">地铁好房</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        state: state
    }
})(ZhengzuPage);