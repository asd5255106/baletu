import React from "react";

import "../../assets/css/my.css"

// 引入cookie接口
import { getUser, logOut } from "../../utils/auth";
import { Toast } from 'antd-mobile';

/*
    我的
*/

class MyPage extends React.Component {
    constructor() {
        super();

        this.state = {
            phone: JSON.parse(getUser("baletu-webapp-user")).username,
            showConfirm: false
        }
    }

    // 功能: 回到首页
    goBack() {
        this.props.history.goBack(-1);
    }

    // 功能: 退出登录
    logout() {
        this.setState({
            showConfirm: true
        })
    }

    // 功能: 点击确认
    sure(e) {
        // 清除cookie
        logOut();
        // 跳转到登录页
        this.props.history.replace({
            pathname: "/home"
        });
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            return false;
        }
    }

    // 功能: 点击取消
    cancel(e) {
        this.setState({
            showConfirm: false
        })
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            return false;
        }
    }
    tiao() {
        window.location.href = "https://m.baletu.com/sh/aboutUs"
    }

    render() {
        // console.log(this.props);

        return (
            <div data-v-cda44fd4="" id="app" className="mycss">
                <div data-v-0783bbc6="" data-v-cda44fd4="" className="my">
                    <div data-v-452748de="" data-v-0783bbc6="" className="my-header clearfix">
                        <div data-v-452748de="" className="header-title">
                            <img
                                onClick={this.goBack.bind(this)}
                                data-v-452748de=""
                                src="//js.baletoo.cn/static/m/static/images/left.png"
                                alt=""
                                className="left-icon" />
                        我的
                    </div>
                        <div data-v-452748de="" className="header-info clearfix">
                            <div data-v-452748de="" className="header-info-photo"><img data-v-452748de=""
                                src="//js.baletoo.cn/Public/app/defaultHeadImage1.png" alt="" /></div>
                            <div data-v-452748de="" className="header-userlogin">
                                <div data-v-452748de="" className="userMsg">
                                    <ul data-v-452748de="">
                                        <li data-v-452748de="" className="userMsg-username"></li>
                                        <li data-v-452748de="" className="userMsg-num">{this.state.phone}</li>
                                    </ul>
                                    <div data-v-452748de="" className="nologin" style={{ display: "none" }}>
                                        <span data-v-452748de="">登录</span>
                                        <span data-v-452748de="">/</span>
                                        <span data-v-452748de="">注册</span>
                                    </div>
                                </div>
                                <div data-v-452748de="" className="signout"><img data-v-452748de=""
                                    src="//js.baletoo.cn/static/m/static/images/signout.png" alt="" />
                                    <span data-v-452748de="" onClick={this.logout.bind(this)}>退出登录</span></div>
                            </div>
                            <div data-v-452748de="" className="vux-confirm">
                                <div className="vux-x-dialog">
                                    <div className="weui-mask" style={{ display: this.state.showConfirm ? "block" : "none" }}></div>
                                    <div className="weui-dialog" style={{ display: this.state.showConfirm ? "table" : "none" }}>
                                        <div className="weui-dialog__hd"><strong className="weui-dialog__title">提示信息</strong></div>
                                        <div className="weui-dialog__bd">
                                            <p data-v-452748de="" style={{ textAlign: "center" }}>您确定退出登录吗?</p>
                                        </div>
                                        <div className="weui-dialog__ft"><a href="###"
                                            className="weui-dialog__btn weui-dialog__btn_default" onClick={this.cancel.bind(this)}>取消</a> <a href="###"
                                                className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.sure.bind(this)}>确定</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => { Toast.info("暂无此功能", 1) }} data-v-0783bbc6="" className="jiaozu"><img data-v-0783bbc6=""
                        src="//js.baletoo.cn/static/m/static/images/jiaozu.png" alt="" className="jiaozu-icon" /> <span
                            data-v-0783bbc6="" className="jiaozu-name">在线交租</span> <img data-v-0783bbc6=""
                                src="//js.baletoo.cn/static/m/static/images/right.png" alt="" className="right-icon" /></div>
                    <div data-v-0783bbc6="" className="fill-bar"></div>
                    <div onClick={() => { Toast.info("暂无此功能", 1) }} data-v-0783bbc6="">
                        <div data-v-77785bea="" data-v-0783bbc6="" className="my-link"><img data-v-77785bea=""
                            src="//js.baletoo.cn/static/m/static/images/tuijian.png" alt="" className="link-icon" /> <span
                                data-v-77785bea="" className="link-name"><span data-v-0783bbc6=""
                                    data-v-77785bea="">推荐房源</span></span> <img data-v-77785bea=""
                                        src="//js.baletoo.cn/static/m/static/images/right.png" alt="" className="right-icon" /></div>
                    </div>
                    <div onClick={() => { Toast.info("暂无此功能", 1) }} data-v-0783bbc6="">
                        <div data-v-77785bea="" data-v-0783bbc6="" className="my-link"><img data-v-77785bea=""
                            src="//js.baletoo.cn/static/m/static/images/shoucang.png" alt="" className="link-icon" /> <span
                                data-v-77785bea="" className="link-name"><span data-v-0783bbc6=""
                                    data-v-77785bea="">收藏房源</span></span> <img data-v-77785bea=""
                                        src="//js.baletoo.cn/static/m/static/images/right.png" alt="" className="right-icon" /></div>
                    </div>
                    <div data-v-0783bbc6="">
                        <div data-v-77785bea="" data-v-0783bbc6="" className="my-link" onClick={() => { this.props.history.push("/yuyue") }}><img data-v-77785bea=""
                            src="//js.baletoo.cn/static/m/static/images/yuyue.png" alt="" className="link-icon" /> <span
                                data-v-77785bea="" className="link-name"><span data-v-0783bbc6=""
                                    data-v-77785bea="">预约房源</span></span> <img data-v-77785bea=""
                                        src="//js.baletoo.cn/static/m/static/images/right.png" alt="" className="right-icon" /></div>
                    </div>
                    <div data-v-0783bbc6="" className="fill-bar"></div>
                    <div onClick={() => { Toast.info("暂无此功能", 1) }} data-v-77785bea="" data-v-0783bbc6="" className="my-link"><img data-v-77785bea=""
                        src="//js.baletoo.cn/static/m/static/images/yijian.png" alt="" className="link-icon" /> <span
                            data-v-77785bea="" className="link-name"><span data-v-0783bbc6="" data-v-77785bea="">意见反馈</span></span>
                        <img data-v-77785bea="" src="//js.baletoo.cn/static/m/static/images/right.png" alt=""
                            className="right-icon" /></div>
                    <div data-v-0783bbc6="" className="fill-bar"></div>
                    <div onClick={() => { Toast.info("暂无此功能", 1) }} data-v-529a0804="" data-v-0783bbc6="" className="download-app"><img data-v-529a0804=""
                        src="//js.baletoo.cn/static/m/static/images/download.png" alt="" className="link-icon" /> <span
                            data-v-529a0804="" className="link-name"><span data-v-0783bbc6="" data-v-529a0804="">下载APP</span></span>
                        <img data-v-529a0804="" src="//js.baletoo.cn/static/m/static/images/right.png" alt=""
                            className="right-icon" /></div>
                    <div data-v-0783bbc6="" className="contact"><img data-v-0783bbc6=""
                        src="//js.baletoo.cn/static/m/static/images/iphone.png" alt="" className="contact-img" /> <span
                            data-v-0783bbc6="" className="contact-name">联系巴乐兔</span> <span data-v-0783bbc6=""
                                className="contact-num">10106006</span></div>
                    <div data-v-0783bbc6="" className="aboutUs" onClick={this.tiao.bind(this)}><img data-v-0783bbc6=""
                        src="//js.baletoo.cn/static/m/static/images/aboutUs.png" alt="" className="aboutUs-icon" /> <span
                            data-v-0783bbc6="" className="aboutUs-name">关于我们</span> <span data-v-0783bbc6=""></span> <img
                            data-v-0783bbc6="" src="//js.baletoo.cn/static/m/static/images/right.png" alt="" className="right-icon" />
                    </div>
                </div>
            </div>
        );
    }
}

export default MyPage;