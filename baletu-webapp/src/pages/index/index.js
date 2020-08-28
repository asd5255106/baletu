import React from "react";
// 引入回到头部组件
import Backtop from "../../components/Backtop"
// 引入搜索页组件
import SearchPage from "../../components/SearchPage"
// 引入api
import homeApi from "../../api/homeApi";
// 引入css
import "../../assets/css/index.css";
// 6.到组件内，接收store的数据
import { connect } from "react-redux";
import actions from "../../store/actions";
// 引入加载中antd组件
import { Toast } from 'antd-mobile';

/*
    首页
*/

class IndexPage extends React.Component {
    constructor(props) {
        super();

        this.state = {
            // 8.在react组件内部，调用redux里面的数据。
            // city: props.state.selectCity.nowCity,
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
            showDownloadApp: true,
            homeList: [],
            page: 1,
            pagesize: 10,
            goDown: 0
        }

        // console.log(props);
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
        this.getHomelist(1, 10, nowCity.address);
        this.setState({
            goDown: 0
        });
    }

    // 功能: 关闭下载app
    closeBot() {
        let { showDownloadApp } = this.state;
        showDownloadApp = !showDownloadApp;
        this.setState({
            showDownloadApp
        });
    }

    // 功能: 获取首页租房列表
    getHomelist(page, pagesize, address) {
        homeApi.getHomelist(page, pagesize, address).then(res => {
            // console.log(res.data.data);
            this.setState({
                homeList: res.data.data
            });
        }).catch(err => { console.log(err); });
    }

    componentDidMount() {
        // 一进来就获取数据
        this.getHomelist(1, 10, this.props.state.selectCity.address);
        // 页面滚动
        window.addEventListener('scroll', this.handleScroll.bind(this), false)
    }

    // 功能: 页面滚动条事件
    handleScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // console.log(scrollTop);     // 动态变化
        // console.log(clientHeight);  // 667
        // console.log(scrollHeight);  // 2180
        // console.log(Math.ceil(scrollTop + clientHeight) >= scrollHeight);

        // 如果没有数据了, 就不再触发loadingToast
        if (this.state.goDown === scrollHeight) {
            // console.log("没数据了");
        } else {
            if (scrollHeight > clientHeight && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
                // console.log("滚动条到底了");
                // 记录到达底部的scrollHeight
                let { goDown } = this.state;
                goDown = scrollHeight;
                this.setState({
                    goDown
                });
                // 到达底部后再次发送请求
                this.loadingToast();
            }
        }
    }

    // 加载中
    loadingToast() {
        Toast.loading('Loading...', 0.5, () => {
            // console.log('Load complete !!!');
            let { pagesize } = this.state;
            pagesize += 10;
            this.setState({
                pagesize
            })
            this.getHomelist(this.state.page, this.state.pagesize, this.props.state.selectCity.address);
        });
    }

    goMy(e) {
        this.props.history.push("/my");
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            return false;
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this), false)
    }

    // 功能: 显示搜索页
    showSearchPage() {
        this.props.dispatch(actions.showSearch.showSearch({show: true}));
    }

    render() {
        // console.log(this.props);

        return (
            <React.Fragment>
                <div data-v-cda44fd4="" id="app" className="indexcss">
                    {/* 搜索内容 */}
                    <SearchPage></SearchPage>
                    {/* 主页内容 */}
                    <div style={{display: this.props.state.showSearch.show ? "none" : "block"}} data-v-5e462810="" data-v-cda44fd4="" className="home">
                        <Backtop class={".study"}></Backtop>
                        <div data-v-6c20eb43="" style={{ display: this.state.showDownloadApp ? "block" : "none" }} data-v-5e462810="" className="download-app">
                            <span data-v-6c20eb43="" className="coloseBot" onClick={this.closeBot.bind(this)}>
                                <img data-v-6c20eb43="" src="//js.baletoo.cn/static/m/static/images/colse-grey.png" alt="" /></span>
                            <div data-v-6c20eb43="" className="downLoad-logo"><img data-v-6c20eb43=""
                                src="//js.baletoo.cn/static/m/static/images/newlogo.png?2018" alt="" /></div>
                            <div data-v-6c20eb43="" className="download">
                                <h3 data-v-6c20eb43="">租房就找巴乐兔</h3>
                                <p data-v-6c20eb43="">押1付1，0中介费，实拍房源</p>
                            </div> <a data-v-6c20eb43="" href="https://download.baletu.com/app?from=homeh5"
                            >下载APP</a>

                        </div>
                        <div data-v-5e462810="" className="banner"><a data-v-5e462810="" className="bannerLink"
                            href="###"><img data-v-5e462810="" alt=""
                                src="https://cdn.baletoo.cn/Uploads/bnanerImageUrl/1/290/oss_5c2497f0c4f9f.jpg" /></a>
                            <div data-v-70b2d22c="" data-v-5e462810="" className="tabCity">
                                <div onClick={this.showSelectCity.bind(this)} data-v-70b2d22c="" className="topSelect"><span data-v-70b2d22c="" className="city-select city-select-text">{this.props.state.selectCity.city}</span>
                                    <span data-v-70b2d22c="" className={this.state.showSelect ? "city-select city-select-bg showSelectArrow" : "city-select city-select-bg"}>　　</span></div>
                                <div data-v-70b2d22c="" className={"option-box " + (this.state.showSelect ? "showSelect" : "hideSelect")}>
                                    <div data-v-70b2d22c="" className="city-option">
                                        <div data-v-70b2d22c="" className="selectCity-title">
                                            <img onClick={this.goBack.bind(this)} data-v-70b2d22c=""
                                                src="//js.baletoo.cn/static/m/static/images/left.png" alt="返回" className="left-icon" />
                                                    选择城市
                            </div>
                                        <div data-v-70b2d22c="" className="cityList">
                                            <h2 data-v-70b2d22c="">当前城市</h2>
                                            <ul data-v-70b2d22c="">
                                                <li data-v-70b2d22c="" onClick={this.choseCity.bind(this, this.props.state.selectCity)}>{this.props.state.selectCity.city}</li>
                                            </ul>
                                        </div>
                                        <div data-v-70b2d22c="" className="cityList">
                                            <h2 data-v-70b2d22c="">热门城市</h2>
                                            <ul data-v-70b2d22c="">
                                                {this.state.citylist.map(item => {
                                                    return <li key={item.address} data-v-70b2d22c="" onClick={this.choseCity.bind(this, item)}>{item.city}</li>
                                                })}
                                                {/* <li data-v-70b2d22c="" onClick={this.choseCity.bind(this, "上海")}>上海</li>
                                                <li data-v-70b2d22c="" onClick={this.choseCity.bind(this, "北京")}>北京</li>
                                                <li data-v-70b2d22c="" onClick={this.choseCity.bind(this, "深圳")}>深圳</li>
                                                <li data-v-70b2d22c="" onClick={this.choseCity.bind(this, "广州")}>广州</li> */}
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
                            </div> <a onClick={this.goMy.bind(this)} data-v-5e462810="" href="###" className="tomyIcon"><img data-v-5e462810=""
                                src="//js.baletoo.cn/static/m/static/images/my.png" alt="" /></a>
                            <div onClick={this.showSearchPage.bind(this)} data-v-5e462810="" className="searchBox"><img data-v-5e462810=""
                                src="//js.baletoo.cn/static/m/static/images/fangdajin.png" alt="" /> <span
                                    data-v-5e462810="">输入区域，小区搜索房源</span></div>
                        </div>
                        <div data-v-15d1f333="" data-v-5e462810="" className="quick-search">
                            <ul data-v-15d1f333="">
                                <li data-v-15d1f333="" className=""><a data-v-15d1f333="" href="/zhengzu"><img
                                    data-v-15d1f333="" src="https://js.baletoo.cn/static/wx/common/zhengtaoIcon.png?2"
                                    alt="" />
                                    <div data-v-15d1f333="" className="type-name">整租</div>
                                </a></li>
                                <li data-v-15d1f333="" className=""><a data-v-15d1f333="" href="/hezu"><img
                                    data-v-15d1f333="" src="https://js.baletoo.cn/static/wx/common/danjianIcon.png?2"
                                    alt="" />
                                    <div data-v-15d1f333="" className="type-name">合租</div>
                                </a></li>
                                <li data-v-15d1f333="" className=""><a data-v-15d1f333="" href="/gongyu"><img
                                    data-v-15d1f333="" src="https://js.baletoo.cn/static/wx/common/gongyuIcon.png?2.1"
                                    alt="" />
                                    <div data-v-15d1f333="" className="type-name">品牌公寓</div>
                                </a></li>
                                <li data-v-15d1f333=""><a data-v-15d1f333="" href="/shiyou"><img data-v-15d1f333=""
                                    src="https://js.baletoo.cn/static/wx/common/shiyouIcon.png?2" alt="" />
                                    <div data-v-15d1f333="" className="type-name">找室友</div>
                                </a></li>
                            </ul>
                        </div>
                        <div data-v-5e462810="" className="study">
                            <div data-v-5e462810="" className="study-title"></div>
                            <ul data-v-5e462810="">
                                <li data-v-5e462810="" className="">
                                    <div data-v-5e462810="" className="wrapper"><img
                                        src="//js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic1h5.png" alt="" /></div>
                                </li>
                                <li data-v-5e462810="" className="padding-l-30">
                                    <div data-v-5e462810="" className="wrapper"><img
                                        src="//js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic2h5.png" alt="" /></div>
                                </li>
                                <li data-v-5e462810="" className="">
                                    <div data-v-5e462810="" className="wrapper"><img
                                        src="//js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic10h5.png" alt="" /></div>
                                </li>
                                <li data-v-5e462810="" className="padding-l-30">
                                    <div data-v-5e462810="" className="wrapper"><img
                                        src="//js.baletoo.cn/Public/indextheme/newtheme/newtheme/pic9h5.png" alt="" /></div>
                                </li>
                            </ul>
                            <div data-v-5e462810="" style={{ clear: "both" }}></div>
                        </div>
                        <div data-v-5e462810="" className="good-house">
                            <div data-v-5e462810="" className="good-title"><span data-v-5e462810="">猜你喜欢</span></div>
                            <ul data-v-5e462810="" className="good-list">
                                {/* 按地方渲染 */}
                                {this.state.homeList.map(item => {
                                    return <li key={item.home_id} data-v-5e462810="" className="good-item">
                                        <div data-v-57b69ae6="" data-v-5e462810="" className="house-card">
                                            <div data-v-57b69ae6="" className="base-info">
                                                <div data-v-57b69ae6="" className="main-photo">
                                                    <div data-v-57b69ae6="" className="main-image" style={{ backgroundImage: `url(${item.img})` }}></div>
                                                    <div data-v-57b69ae6="" className="house-logo"><img data-v-57b69ae6=""
                                                        src="https://js.baletoo.cn/Public/app/house_list/better_house@3x.png" alt=""
                                                        className="img" /></div>
                                                    {item.tishi ? <div data-v-57b69ae6="" className="live-photo">{item.tishi}</div> : ""}
                                                </div>
                                                <div data-v-57b69ae6="" className="detail">
                                                    <p data-v-57b69ae6="" className="title">
                                                        <span data-v-57b69ae6="">{item.title}</span></p>
                                                    <p data-v-57b69ae6="" className="room-info">{item.roomInfo}</p>
                                                    <div data-v-57b69ae6="" className="trafic">
                                                        <div data-v-57b69ae6="" className="icon"></div>
                                                        <div data-v-57b69ae6="" className="text">{item.text}</div>
                                                    </div>
                                                    <p data-v-57b69ae6="" className="labels">
                                                        {JSON.parse(item.biaoqian).map((label, index) => {
                                                            return <span key={index} data-v-57b69ae6="" className="label">{label}</span>
                                                        })}
                                                    </p>
                                                    <div data-v-57b69ae6="" className="price"><span data-v-57b69ae6=""
                                                        className="bold">{item.price}</span>元</div>
                                                    <ul data-v-57b69ae6="" className="activity-info">
                                                        <li data-v-57b69ae6=""><img data-v-57b69ae6=""
                                                            src="//js.baletoo.cn/Public/app/house_list/seven_day_refund@3x.png"
                                                            alt="" className="img" /> <span data-v-57b69ae6="">七天无理由退租</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })}
                            </ul>
                            <p data-v-5e462810="" className="vux-divider" style={{ paddingBottom: "40px" }}>我是有底线的</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// 7.引入store的数据
export default connect((state) => {
    return {
        state: state
    }
})(IndexPage);