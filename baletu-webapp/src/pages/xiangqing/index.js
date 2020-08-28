import React from "react";
import "../../assets/css/xiangqing.css"

// import { compose } from "redux";
// 引入公共头部组件
// import Comheader from "../../components/Comheader"

// 引入走马灯
import { Carousel } from 'antd-mobile';

import localParam from "../../utils/localParam"

import detailApi from "../../api/detailApi"

import Map from "../../components/Map"

import { getCookie } from "../../utils/auth";

import { Toast, Modal } from 'antd-mobile';
const prompt = Modal.prompt;

/*
    详情页
*/

class XiangQingPage extends React.Component {
    constructor() {
        super();
        this.state = {
            mapTextTablist: [
                {
                    cont: "地址",
                    check: "active",
                    class: "iconDz"
                },
                {
                    cont: "交通",
                    check: "",
                    class: "iconJt"
                },
                {
                    cont: "周边配套",
                    check: "",
                    class: "iconPt"
                }
            ],
            imgList: [],
            imgHeight: 180,
            currentIndex: 0,
            detailData: [],
            biaoqian: [],
            type: "",
            huxing: "",
            periphery: [],
            location: {},
            adress: "",
            mark: false,
            home_id: "",
            address: ""
        };
    }
    yuyue() {
        // console.log(this.state.home_id, this.state.address);
        let user_id = getCookie("baletu-webapp-user") ? JSON.parse(getCookie("baletu-webapp-user")).user_id : ""
        // console.log(user_id)
        var d = new Date();
        var n = d.toLocaleDateString();
        // console.log(n)
        let home_id = this.state.home_id * 1
        let address = this.state.address
        let time = n
        let p = detailApi.checkYue(home_id, address, user_id);
        p.then(res => {
            console.log(res)
            if (res.data.flag) {
                // console.log(home_id, address, user_id, time);
                if (user_id !== "") {
                    let w = detailApi.onClick(home_id, address, user_id, time);
                    w.then(ret => {
                        if (ret.data.flag) {
                            Toast.success("预约成功", 2)
                        } else {
                            Toast.success("未能预约", 2)
                        }
                    }).catch(() => {
                        Toast.fail("请求超时", 1);
                    })
                }else{
                    Toast.info("请先登录", 1);
                }
            } else {
                Toast.success("已经预约过了", 2)
            }
        }).catch(() => {
            console.log("查询出错")
        })

    }
    componentDidMount() {

        window.scrollTo(0, 0);
        // 走马灯
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
        // 根据this.props.history.location.search拿到home_id和address
        let str = this.props.history.location.search;
        let { home_id, address } = localParam(str).search;
        // console.log(home_id, address);
        this.setState({
            home_id,
            address
        })
        // 发送请求
        let p = detailApi.getDetaillist(home_id, address);
        p.then(res => {
            // console.log(res.data.data[0]);
            let adress = res.data.data[0].adress;
            // console.log(JSON.parse(res.data.data[0].imgsrc));
            let imgList = JSON.parse(res.data.data[0].imgsrc);
            let biaoqian = JSON.parse(res.data.data[0].biaoqian)
            let huxing = res.data.data[0].huxing;
            let type = huxing.slice(0, 1);
            if (type === "朝") {
                this.setState({
                    type: "朝向"
                })
            } else {
                this.setState({
                    type: "户型"
                })
            }
            let periphery = res.data.data[0].periphery.split("  ");
            // console.log(periphery);
            this.setState({
                imgList,
                detailData: res.data.data[0],
                biaoqian,
                huxing,
                periphery,
                adress
            });
        });
    }

    // 打开房费
    RoomCost() {
        document.querySelector(".price-detail-wrapper").style.display = "block";
        document.querySelector(".price-detail-wrapper").children[0].classList.add("bounceInUp")
    }

    // 关闭房费
    RoomCostclose() {
        document.querySelector(".price-detail-wrapper").style.display = "none";
        document.querySelector(".price-detail-wrapper").children[0].classList.remove("bounceInUp")

    }

    // 打开房间详情
    RoomDetails() {
        document.querySelector(".tabCity").style.display = "block";
    }

    // 关闭房间详情
    RoomDetailsclose() {
        document.querySelector(".tabCity").style.display = "none";
    }

    // 切换（地址-交通-周边）
    change(n) {
        let ref = this.state.mapTextTablist
        ref.map(item => item.check = "")
        ref[n].check = "active"
        this.setState({
            mapTextTablist: ref
        })
        Array.from(document.querySelectorAll(".mapTextConter")).map(item => item.style.display = "none")
        document.querySelectorAll(".mapTextConter")[n].style.display = "block";
    }

    // 点击常见问题
    quession(ev) {
        // console.log(ev.target.parentNode.querySelector(".move-div__content-wrapper"))
        let arr = ev.target.parentNode.querySelector(".move-div__content-wrapper")
        if (arr.classList.length > 1) {
            arr.classList.remove("none")
            arr.children[0].classList.add("move-div__content--show")
        } else if (arr.classList.length === 1) {
            arr.classList.add("none")
            arr.children[0].classList.remove("move-div__content--show")
        }
    }

    // 返回按钮
    goBack() {
        this.props.history.goBack(-1);
    }

    // 收藏
    sc() {
        let { mark } = this.state;
        mark = !mark;
        if (mark) {
            Toast.success('收藏成功', 2);
        } else {
            Toast.info('取消收藏', 2);
        }
        this.setState({
            mark
        })
    }

    render() {
        // console.log(this.props);
        // console.log(this.state);
        return (
            <div>
                <div data-v-cda44fd4="" id="app">
                    <div data-v-31fd8a25="" data-v-cda44fd4="">
                        <div data-v-3ddee1be="" data-v-31fd8a25="" className="tabCity" style={{ display: "none" }} >
                            <div data-v-3ddee1be="" className="option-box showSelect">
                                <div data-v-3ddee1be="" className="city-option">
                                    <div data-v-3ddee1be="" className="selectCity-title">
                                        <img data-v-3ddee1be="" src="https://js.baletoo.cn/static/m/static/images/left.png" alt="返回" className="left-icon" onClick={this.RoomDetailsclose.bind(this)} />
                                            房源详情
                                    </div>
                                    <div data-v-3ddee1be="" className="detail_all">
                                        <div data-v-3ddee1be="" className="detail_all__content">
                                            <div data-v-3ddee1be="" className="detail_all__content__flicity">
                                                <div data-v-3ddee1be="" className="detail_all__content__flicity__title">独立设施</div>
                                                <div data-v-3ddee1be="" className="detail_all__content__flicity__list">
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/2.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">双人床</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/3.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">衣橱</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/4.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">写字台</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/7.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">空调</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/9.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">冰箱</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/11.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">电磁炉</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/14.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">洗衣机</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/15.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">热水器</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/16.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">卫生间</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/24.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">坐式马桶</div>
                                                    </div>
                                                    <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item">
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__icon"><img
                                                            data-v-3ddee1be="" src="https://js.baletoo.cn/Public/new_facilities/house/17.png?20180815" alt="" />
                                                        </div>
                                                        <div data-v-3ddee1be="" className="detail_all__content__flicity__list__item__text">厨房</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-v-3ddee1be="" className="detail_all__content__flicity">
                                                <div data-v-3ddee1be="" className="detail_all__content__flicity__title">公用设施</div>
                                                <div data-v-3ddee1be="" className="detail_all__content__flicity__list"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 详情 */}
                        {/* 房间图片 */}
                        <div data-v-31fd8a25="" className="detail">
                            <div onClick={this.goBack.bind(this)} data-v-31fd8a25="" className="backBtn"><span data-v-31fd8a25="">&nbsp;</span></div>
                            {/* 走马灯 */}
                            <div className="vux-swiper">
                                {/* 走马灯组件 */}
                                <Carousel
                                    autoplay={false}
                                    infinite
                                    dots={false}
                                    afterChange={index => this.setState({ currentIndex: index })}
                                >
                                    {this.state.imgList.map((item, index) => (
                                        <img
                                            data-v-752ac346=""
                                            className="previewer-img"
                                            key={index}
                                            src={item}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                // this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                    ))}
                                </Carousel>
                                {/* 页数 */}
                                <div data-v-752ac346="" className="swiper-count">
                                    <div data-v-752ac346="" className="swiper-count-text">{this.state.currentIndex + 1}/{this.state.imgList.length}</div>
                                    <div data-v-752ac346="" className="swiper-count-bg"></div>
                                </div>
                            </div>
                            {/* 付款方式的弹框 */}
                            <div data-v-31fd8a25="" className="detail-info" style={{ marginTop: "-0.3rem" }}>
                                <ul data-v-31fd8a25="" className="modularSt">
                                    <li data-v-31fd8a25="">
                                        <div data-v-31fd8a25="" className="price-detail-wrapper" style={{ display: "none" }}>
                                            <div data-v-31fd8a25="" className="price-detail">
                                                <p data-v-31fd8a25=""> 费用详情 </p>
                                                <div data-v-31fd8a25="" className="price-detail-titlezujin"><span data-v-31fd8a25=""
                                                    className="left">租金</span> <span data-v-31fd8a25="" className="right">如有疑问，请电话咨询</span></div>
                                                <div data-v-31fd8a25="" className="price-detail-items">
                                                    <div data-v-31fd8a25="" className="price-detail-item color1"><span data-v-31fd8a25="">押金</span> <span
                                                        data-v-31fd8a25="">{this.state.detailData.price}元</span></div>
                                                    <div data-v-31fd8a25="" className="price-detail-item color2"><span data-v-31fd8a25="">付三押一</span> <span
                                                        data-v-31fd8a25="">¥{this.state.detailData.price}/月</span></div>
                                                    <div data-v-31fd8a25="" className="price-detail-item red color1"><span data-v-31fd8a25="">首期共支付</span>
                                                        <span data-v-31fd8a25="">{this.state.detailData.price * 4}元</span></div>
                                                </div>
                                                <div data-v-31fd8a25="" className="price-detail-items" style={{ paddingBottom: 1 * 50 }} >
                                                    <div data-v-31fd8a25="" className="price-detail-yangguang"><span data-v-31fd8a25="" className="left"><img
                                                        data-v-31fd8a25="" src="https://js.baletoo.cn/static/m/static/images/yangguangshoufei.png"
                                                        alt="" />阳光收费</span> <span data-v-31fd8a25="" className="right">如有疑问，请电话咨询</span></div>
                                                    <div data-v-31fd8a25="" className="price-detail-item color1"><span data-v-31fd8a25="">水费</span> <span data-v-31fd8a25="">30 元 </span></div>
                                                    <div data-v-31fd8a25="" className="price-detail-item color1"><span data-v-31fd8a25="">网费</span> <span data-v-31fd8a25="">50 元 </span></div>
                                                    <div data-v-31fd8a25="" className="price-detail-item color1"><span data-v-31fd8a25="">公用电费</span> <span data-v-31fd8a25="">1.5 元</span></div>
                                                    <div data-v-31fd8a25="" className="price-detail-item color1"><span data-v-31fd8a25="">热水费 </span> <span data-v-31fd8a25="">60 元</span></div>
                                                </div>
                                                <div data-v-31fd8a25="" className="price-detail-btn" onClick={this.RoomCostclose.bind(this)}>  我知道了</div>
                                            </div>
                                        </div>
                                        {/* 房名 */}
                                        <h1 data-v-31fd8a25="" className="house-title">{this.state.detailData.title}</h1>
                                        {/* 房间标签 */}
                                        <ul data-v-31fd8a25="" className="house-labels">
                                            {this.state.biaoqian.map((item, index) => {
                                                return <li key={index} data-v-31fd8a25="" className="label">{item}</li>
                                            })}
                                        </ul>
                                        {/* 房间租金 */}
                                        <div data-v-31fd8a25="" className="house-price-wrapper">
                                            <div data-v-31fd8a25="" className="house-price-left">
                                                <div data-v-31fd8a25="" className="price-text"><span data-v-31fd8a25="" className="bold">{this.state.detailData.price}</span>元/月</div>
                                            </div>
                                            <div data-v-31fd8a25="" className="price-detail-title"><span data-v-31fd8a25="" onClick={this.RoomCost.bind(this)}>付款方式</span><i data-v-31fd8a25="" className="icon-arrow"></i></div>
                                        </div>
                                        <p data-v-31fd8a25="" style={{ height: 0.2 * 50 }} >&nbsp; </p>
                                    </li>
                                    <li data-v-31fd8a25="" className="house-ms">
                                        <ul data-v-31fd8a25="">
                                            <li data-v-31fd8a25="">
                                                <div data-v-31fd8a25="">{this.state.type}</div>
                                                <div data-v-31fd8a25="" className="bold">{this.state.huxing}</div>
                                            </li>
                                            <li data-v-31fd8a25="">
                                                <div data-v-31fd8a25="">面积</div>
                                                <div data-v-31fd8a25="" className="bold">{this.state.detailData.mianji}</div>
                                            </li>
                                            <li data-v-31fd8a25="">
                                                <div data-v-31fd8a25="">楼层</div>
                                                <div data-v-31fd8a25="" className="bold">{this.state.detailData.louceng}</div>
                                            </li>
                                        </ul>
                                    </li>
                                    <p data-v-31fd8a25="" style={{ height: 0.4 * 50 }} >&nbsp;</p>
                                </ul>
                                {/* 广告 */}
                                <div data-v-31fd8a25="" className="baletu-baner"><img data-v-31fd8a25=""
                                    src="//js.baletoo.cn/static/m/images/banner_serve.png" alt="巴乐兔服务" /></div>
                                {/* 房间信息 */}
                                <div data-v-31fd8a25="" className="section sheshi">
                                    <div data-v-31fd8a25="" className="section-title">
                                        <div data-v-31fd8a25="" className="section-title-left">房源设施</div>
                                        <div data-v-31fd8a25="" className="section-title-right"><span data-v-31fd8a25="" className="more">可以做饭吗</span> <i
                                            data-v-31fd8a25="" className="icon-arrow"></i></div>
                                    </div>
                                    <div data-v-31fd8a25="" className="falicities-wrapper">
                                        <ul data-v-31fd8a25="" className="falicities-list">
                                            <li data-v-31fd8a25="" className="item"><img data-v-31fd8a25=""
                                                src="//js.baletoo.cn/Public/new_facilities/house/2.png?20180815" alt="" />
                                                <div data-v-31fd8a25="">双人床</div>
                                            </li>
                                            <li data-v-31fd8a25="" className="item"><img data-v-31fd8a25=""
                                                src="//js.baletoo.cn/Public/new_facilities/house/3.png?20180815" alt="" />
                                                <div data-v-31fd8a25="">衣橱</div>
                                            </li>
                                            <li data-v-31fd8a25="" className="item"><img data-v-31fd8a25=""
                                                src="//js.baletoo.cn/Public/new_facilities/house/4.png?20180815" alt="" />
                                                <div data-v-31fd8a25="">写字台</div>
                                            </li>
                                            <li data-v-31fd8a25="" className="item"><img data-v-31fd8a25=""
                                                src="//js.baletoo.cn/Public/new_facilities/house/7.png?20180815" alt="" />
                                                <div data-v-31fd8a25="">空调</div>
                                            </li>
                                            <li data-v-31fd8a25="" className="item"><img data-v-31fd8a25=""
                                                src="//js.baletoo.cn/Public/new_facilities/house/9.png?20180815" alt="" />
                                                <div data-v-31fd8a25="">冰箱</div>
                                            </li>
                                        </ul>
                                        <div data-v-31fd8a25="" className="falicities-more" onClick={this.RoomDetails.bind(this)}>全部</div>
                                    </div>
                                </div>
                                <div data-v-31fd8a25="" className="section zhoubian">
                                    <div data-v-31fd8a25="" className="section-title">
                                        <div data-v-31fd8a25="" className="section-title-left">{this.state.detailData.xititle}</div>
                                    </div>
                                </div>
                                <div data-v-31fd8a25="" className="modularSt mapText">
                                    {/* 周边环境 */}
                                    <ul data-v-31fd8a25="" className="mapTextTab">
                                        {/* <li data-v-31fd8a25=""><span data-v-31fd8a25="" className=""><span data-v-31fd8a25=""
                                            className="iconDz"></span>地址</span></li>
                                        <li data-v-31fd8a25=""><span data-v-31fd8a25="" className=""><span data-v-31fd8a25=""
                                            className="iconJt"></span>交通</span></li>
                                        <li data-v-31fd8a25=""><span data-v-31fd8a25="" className="active"><span data-v-31fd8a25=""
                                            className="iconPt"></span>周边配套</span></li> */}
                                        {this.state.mapTextTablist.map((item, index) => {
                                            return (
                                                <li key={item.cont} data-v-31fd8a25=""><span data-v-31fd8a25="" className={item.check} onClick={this.change.bind(this, index)}><span data-v-31fd8a25="" className={item.class}></span>{item.cont} </span></li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div data-v-31fd8a25="" className="modularSt mapImg">
                                    <div data-v-31fd8a25="" className="mapImgMore">
                                        {/* 百度地图组件 */}
                                        <Map adress={this.state.adress}></Map>
                                        <div data-v-31fd8a25="" className="map-text-wrapper">
                                            <p data-v-31fd8a25="" className="map-text"><span data-v-31fd8a25="" className="dingwei"></span>{this.state.detailData.adress}</p>
                                        </div>
                                    </div>
                                    <div data-v-31fd8a25="" className="mapTextConter" style={{ display: "block" }} >
                                        {this.state.detailData.adress}
                                    </div>
                                    <div data-v-31fd8a25="" className="mapTextConter" style={{ display: "none" }}>
                                        {this.state.detailData.traffic}
                                    </div>
                                    <div data-v-31fd8a25="" className="mapTextConter" style={{ display: "none" }}>
                                        <ul data-v-31fd8a25="">
                                            {this.state.periphery.map((item, index) => {
                                                let key = item.split("：")[0];
                                                let value = item.split("：")[1];
                                                return <li key={index} data-v-31fd8a25=""><span data-v-31fd8a25=""> {key}：</span>{value}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 底部导航 */}
                            <ul data-v-31fd8a25="" className="page-footer">
                                <li data-v-31fd8a25="" className="wrap-sc" onClick={this.sc.bind(this)}><img data-v-31fd8a25=""
                                    src="//js.baletoo.cn/static/m/images/icon_collect_not.png" alt="" style={{ display: this.state.mark ? "none" : "block" }} />
                                    <img data-v-31fd8a25="" src="//js.baletoo.cn/static/m/images/icon_collect_yes.png" alt="" style={{ display: this.state.mark ? "block" : "none" }} />

                                    <div data-v-31fd8a25="" className="text" style={{ display: this.state.mark ? "none" : "block" }}>收藏</div>
                                    <div data-v-31fd8a25="" className="text red" style={{ display: this.state.mark ? "block" : "none" }}>已收藏</div>
                                </li>
                                <li data-v-31fd8a25="" className="wrap-btns">
                                    <div data-v-31fd8a25="" className="wrap-btns-item">

                                        <div data-v-31fd8a25="" className="btn-yuyue"
                                            onClick={() => prompt('预约看房', '*请填写以下信息，巴乐兔管家会尽快联系你', [
                                                { text: '取消' },
                                                {
                                                    text: '确定', onPress: (value) => {
                                                        if (value !== "" && /^1[3-9]\d{9}$/.test(value)) {
                                                            this.yuyue()
                                                        } else {
                                                            Toast.info("请输入正确的电话号", 2)
                                                        }
                                                    }
                                                },
                                            ], 'default', getCookie("baletu-webapp-user") ? JSON.parse(getCookie("baletu-webapp-user")).username : ""
                                            )}
                                        > 预约看房</div>

                                    </div>
                                    <div data-v-31fd8a25="" className="wrap-btns-item">

                                        <div onClick={() => { this.props.history.push("/yuyue") }} data-v-31fd8a25="" className="btn-tel">预约管家</div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* 导航栏 */}
                        <div data-v-31fd8a25="">
                            <div data-v-31fd8a25="" className="question-wrapper animation" askquestion="function () { [native code] }">
                                <div className="question-title" onClick={(ev) => this.quession(ev)}></div>
                                <div className="move-div__content-wrapper none">
                                    <div className="move-div__content move-div__content--hide">
                                        <div className="move-div-question move-div-item"><span>最少可以租几个月？</span>
                                            <div className="move-div-question__icon"></div>
                                        </div>
                                        <div className="move-div-question move-div-item move-div-question--255"><span>可以做饭吗？</span>
                                            <div className="move-div-question__icon"></div>
                                        </div>
                                        <div className="move-div-question move-div-item"><span>价格还能优惠些么？</span>
                                            <div className="move-div-question__icon"></div>
                                        </div>
                                        <div className="move-div-question move-div-item"><span>什么时候方便看房？</span>
                                            <div className="move-div-question__icon"></div>
                                        </div>
                                        <div className="move-div-question move-div-item move-div-question--long"><span>还有其他图片看看么？</span>
                                            <div className="move-div-question__icon"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 预约弹框 */}
                <div data-v-31fd8a25="" className="popupYuyue v-transfer-dom">
                    <div data-v-31fd8a25="" className="vux-confirm">
                        <div className="vux-x-dialog">
                            <div className="weui-mask" style={{ display: "none" }}></div>
                            <div className="weui-dialog" style={{ display: "none" }}>
                                <div className="weui-dialog__hd"><strong className="weui-dialog__title">预约看房</strong></div>
                                <div className="weui-dialog__bd">
                                    <ul data-v-31fd8a25="">
                                        <li data-v-31fd8a25="">
                                            <p data-v-31fd8a25="">*请填写以下信息，巴乐兔管家会尽快联系你</p>
                                        </li>
                                        <li data-v-31fd8a25=""><input data-v-31fd8a25="" type="numble" value="" maxLength="11" placeholder="手机号码" onChange={() => { console.log(666) }} />
                                        </li>
                                    </ul>
                                </div>
                                <div className="weui-dialog__ft"><a href="###" className="weui-dialog__btn weui-dialog__btn_default">取消</a>
                                    <a href="###" className="weui-dialog__btn weui-dialog__btn_primary">确定</a></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default XiangQingPage;

