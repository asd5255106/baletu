import React from "react";

import "../../assets/css/login.css"

import { Toast } from 'antd-mobile';

// 引入api
import userApi from "../../api/usersApi";

// 引入cookie接口
import { setToken, setUser } from "../../utils/auth";

/*
    登录页
*/

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            turnRed: false,
            changeBox: true,
            mobileValue2: "",
            passwordValue2: "",
            ischecked: false
        };
    }

    // 功能: 登录
    login(e) {
        let { mobileValue2, passwordValue2, ischecked } = this.state;
        if (ischecked) {
            // 勾选了同意协议
            if (mobileValue2 !== "" && /^1[3-9]\d{9}$/.test(mobileValue2)) {
                // 手机号码不为空且正确
                // console.log("手机号码正确");
                if (passwordValue2 !== "") {
                    // 密码不为空
                    // 验证通过, 发送请求
                    // console.log("验证通过, 发送请求")
                    let pwd = this.$md5(passwordValue2);
                    let p = userApi.login(mobileValue2, pwd);
                    p.then(res => {
                        // console.log(res.data);
                        if (res.data.flag) {
                            // 存token和用户名和user_id到cookie中
                            let obj = {
                                username: mobileValue2,
                                user_id: res.data.data[0].user_id
                            }
                            // console.log(obj);
                            setToken(res.data.token, 7);
                            setUser(JSON.stringify(obj), 7);
                            // 登录成功, 自动跳转到首页
                            Toast.success('登录成功', 1, () => {
                                // 跳转到首页
                                this.props.history.replace({
                                    pathname: "/home"
                                })
                            });
                        }else{
                            // 登录失败, 提示
                            Toast.fail("手机号码或密码错误", 1);
                        }
                    });
                } else {
                    // 密码为空
                    this.showToast("请输入密码");
                }
            } else if (mobileValue2 === "") {
                this.showToast("请输入手机号码");
            } else {
                // 手机号不正确
                // console.log("手机号不正确");
                this.showToast("请输入正确的手机号码");
            }
        } else {
            // 没有勾选同意协议
            Toast.info("请勾选并同意协议", 2);
        }
        // 取消默认行为
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            return false;
        }
    }

    showToast(tip) {
        Toast.info(tip, 2);
    }

    // 功能: 返回首页
    gobakck() {
        this.props.history.replace({
            pathname: "/"
        });
    }

    // 功能: 返回随机验证码
    returnCode() {
        let str = '0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * str.length);
            code += str[index];
        }
        return code;
    }

    // 功能: 获取验证码
    showCode() {
        Toast.info(this.returnCode(), 2);
    }

    // 功能: 切换登录方式
    changeLog(way) {
        if (way === "phone") {
            // 快速登录
            this.setState({
                changeBox: false
            })
        } else {
            // 账号登录
            this.setState({
                changeBox: true
            })
        }
    }

    // 功能: 手机号码输入框
    mobile2(e) {
        // console.log(e.target.value);
        let { mobileValue2 } = this.state;
        mobileValue2 = e.target.value;
        this.setState({
            mobileValue2
        })
    }

    // 功能: 密码输入框
    password2(e) {
        let { passwordValue2 } = this.state;
        passwordValue2 = e.target.value;
        this.setState({
            passwordValue2
        })
    }

    // 功能: 按钮变红
    btnTurn() {
        this.setState({
            turnRed: true
        })
    }

    // 功能: 同意协议
    agree(e) {
        let { ischecked } = this.state;
        ischecked = e.target.checked;
        this.setState({
            ischecked
        })
    }

    // 功能: 去注册
    goReg(){
        this.props.history.replace({
            pathname: "/reg"
        });
    }

    render() {
        return (
            <div>
                <div data-v-cda44fd4="" id="app">
                    <div data-v-7d5aab2e="" data-v-cda44fd4="">
                        <div data-v-00320224="" data-v-7d5aab2e="">
                            <div data-v-00320224="" className="xu">
                                <div data-v-00320224="" className="logoLogin">
                                    <div data-v-00320224="" className="xu_msg xu_msg01"><img onClick={this.gobakck.bind(this)} data-v-00320224=""
                                        src="//js.baletoo.cn/static/m/static/images/left.png" alt="" className="left-icon" /></div>
                                    <div data-v-00320224="" className="waveWrapper waveAnimation"><img data-v-00320224=""
                                        src="//js.baletoo.cn/static/m/static/images/newlogo2.png?2018" alt="" />
                                        <div data-v-00320224="" className="waveWrapperInner bgTop">
                                            <div data-v-00320224="" className="wave waveTop"></div>
                                        </div>
                                        <div data-v-00320224="" className="waveWrapperInner bgMiddle">
                                            <div data-v-00320224="" className="wave waveMiddle"></div>
                                        </div>
                                        <div data-v-00320224="" className="waveWrapperInner bgBottom">
                                            <div data-v-00320224="" className="wave waveBottom"></div>
                                        </div>
                                    </div>
                                </div>
                                <div data-v-00320224="" className="tabLogin">
                                    <ul data-v-00320224="">
                                        <li data-v-00320224="" value="" className={this.state.changeBox ? "xuan1" : "xuan1 active"} onClick={this.changeLog.bind(this, "phone")}>快速登录</li>
                                        <li data-v-00320224="" value="" className={this.state.changeBox ? "xuan1 active" : "xuan1"} onClick={this.changeLog.bind(this, "account")}>账号登录</li>
                                    </ul>
                                </div>
                                <form data-v-00320224="" name="LoginForm" className="xu_deg">
                                    {/* 快速登录 */}
                                    <div data-v-00320224="" className="div_in1" style={{ display: this.state.changeBox ? "none" : "block" }}>
                                        <div data-v-00320224="" className="xu_num">
                                            <input data-v-00320224="" id="mobile" type="tel"
                                                name="mobile" placeholder="手机号码" maxLength="11" autoComplete="off" /> <span
                                                    data-v-00320224="" id="sendBtn" onClick={this.showCode.bind(this)}>获取验证码</span>
                                            <span data-v-00320224="" id="sendBtn_new" style={{ display: "none" }}></span></div>
                                        <div data-v-00320224="" className="xu_num xu_num01">
                                            <input data-v-00320224="" id="verify_code"
                                                type="text" name="verify_code" placeholder="验证码" autoComplete="off" />
                                        </div>
                                    </div>
                                    {/* 账号登录 */}
                                    <div data-v-00320224="" className="div_in2" style={{ display: this.state.changeBox ? "block" : "none" }}>
                                        <div data-v-00320224="" className="xu_num">
                                            <input onFocus={this.btnTurn.bind(this)} onChange={this.mobile2.bind(this)} data-v-00320224="" id="mobile2" type="tel" value={this.state.mobileValue2}
                                                name="mobile2" placeholder="手机号码" maxLength="11" autoComplete="off" /></div>
                                        <div data-v-00320224="" className="xu_num xu_num01">
                                            <input onFocus={this.btnTurn.bind(this)} onChange={this.password2.bind(this)} data-v-00320224="" id="pass_word" value={this.state.passwordValue2}
                                                type="password" name="pass_word" placeholder="密码" autoComplete="off" /></div>
                                    </div>
                                    <p onClick={() => {Toast.info("暂无此功能",1)}} data-v-00320224="" className="yuy_yzm" style={{ display: this.state.changeBox ? "none" : "block" }}>
                                        <a data-v-00320224="" href="###">收不到验证码?&nbsp;试试语音验证码</a>
                                    </p>
                                    <div data-v-00320224="" id="inp-botLine" style={{ display: this.state.changeBox ? "block" : "none" }}><a data-v-00320224=""
                                        onClick={() => {Toast.info("暂无此功能",1)}} href="###" className="">忘记密码</a> <a data-v-00320224="" href="###" onClick={this.goReg.bind(this)}
                                            className="">手机号注册</a></div>
                                    <button onClick={this.login.bind(this)}
                                        data-v-00320224=""
                                        type="submit"
                                        className={this.state.turnRed ? "tijiao btn-red tijiao-active" : "tijiao btn-red"}>登录</button>
                                </form>
                                <p data-v-00320224="" className="botText-login"><span data-v-00320224="" className="check-wrap">
                                    <input onChange={this.agree.bind(this)} data-v-00320224="" id="inp-checkAgreement" type="checkbox" checked={this.state.ischecked}
                                    />勾选并同意</span><a data-v-00320224="" id="tksm"
                                        href="###"><span
                                            data-v-00320224="">《巴乐兔隐私与服务协议》</span></a></p>
                                <div data-v-00320224="" id="coverContainer" style={{ display: "none" }}>
                                    <div data-v-00320224="" className="cover"></div>
                                    <div data-v-00320224="" id="TCaptcha" className="slider"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;