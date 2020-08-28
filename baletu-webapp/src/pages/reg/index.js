import React from "react";

import "../../assets/css/reg.css"

import { Toast } from 'antd-mobile';

// 引入图形验证码插件
import CaptchaMini from "captcha-mini";

// 引入api
import userApi from "../../api/usersApi";

/*
    注册页
*/

class RegPage extends React.Component {
    constructor() {
        super();
        this.state = {
            turnRed: false,
            mobileValue: "",
            passwordValue: "",
            verify: "",
            rightCode: ""
        };
    }

    // 功能: 手机号码输入框
    mobile(e) {
        // console.log(e.target.value);
        let { mobileValue } = this.state;
        mobileValue = e.target.value;
        this.setState({
            mobileValue
        })
    }

    // 功能: 密码输入框
    password(e) {
        let { passwordValue } = this.state;
        passwordValue = e.target.value;
        this.setState({
            passwordValue
        })
    }

    // 功能: 验证码输入框
    verify(e) {
        let { verify } = this.state;
        verify = e.target.value;
        this.setState({
            verify
        })
    }

    // 功能: 按钮变红
    btnTurn() {
        this.setState({
            turnRed: true
        })
    }

    // 功能: 点击注册
    reg() {
        let { mobileValue, passwordValue, verify, rightCode } = this.state;
        if (verify.toLowerCase() === rightCode.toLowerCase()) {
            // 验证码正确
            // console.log("验证码正确");
            if (mobileValue !== "" && /^1[3-9]\d{9}$/.test(mobileValue)) {
                // 手机号码不为空且正确
                // console.log("手机号码正确");
                if (passwordValue !== "" && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(passwordValue)) {
                    // 密码不为空
                    // 验证通过, 发送请求
                    // console.log("验证通过, 发送请求")
                    let pwd = this.$md5(passwordValue);
                    // 1. 判断用户名是否存在
                    let p = userApi.checkName(mobileValue);
                    p.then(res => {
                        //   console.log(res.data);
                        if (res.data.flag) {
                            // 允许注册
                            // console.log("允许注册");
                            userApi.reg(mobileValue, pwd).then(resp => {
                                // console.log(resp);
                                Toast.success('注册成功', 1, () => {
                                    // 跳转到登录页面
                                    this.props.history.replace({
                                        pathname: "/login"
                                    })
                                });
                            });
                        } else {
                            // 用户已存在
                            this.showToast("该用户名已经存在，请重新输入");
                            // console.log("不允许注册");
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                } else if (passwordValue === "") {
                    // 密码为空
                    this.showToast("请输入密码");
                } else {
                    // 密码不符合
                    this.showToast("密码不符合规则，请填写6到16位数字加字母");
                }

            } else {
                // 手机号不正确
                //   console.log("手机号不正确");
                this.showToast("请输入正确的手机号码");
            }
        } else {
            // 验证码错误
            // console.log("验证码错误");
            this.showToast("图片验证码输入错误！");
        }
    }

    showToast(tip) {
        Toast.info(tip, 2);
    }

    componentDidMount() {
        let captcha = new CaptchaMini({
            lineWidth: 1, //线条宽度
            lineNum: 0, //线条数量
            dotR: 1.5, //点的半径
            dotNum: 50, //点的数量
            preGroundColor: [10, 80], //前景色区间
            backGroundColor: [242, 242], //背景色区间
            fontSize: 80, //字体大小
            fontFamily: ["Georgia", "微软雅黑", "Helvetica", "Arial"], //字体类型
            fontStyle: "fill", //字体绘制方法，有fill和stroke
            content: "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM", //验证码内容
            length: 4 //验证码长度
        });
        captcha.draw(document.querySelector("#captcha"), r => {
            // console.log(r);
            this.setState({
                rightCode: r
            })
        });
    }

    render() {
        return (
            <div>
                <div data-v-cda44fd4="" id="app">
                    <div data-v-7d5aab2e="" data-v-cda44fd4="">
                        <div data-v-23a36877="" data-v-7d5aab2e="">
                            <div data-v-23a36877="" className="login">
                                <section data-v-23a36877="" className="xu_msg xu_msg01">
                                    <span onClick={() => {this.props.history.replace({pathname:"/login"})}} data-v-23a36877=""></span>
                                    <h2 data-v-23a36877="">欢迎注册</h2>
                                </section>
                                <form data-v-23a36877="" action="" name="LoginForm" className="xu_deg">
                                    <div data-v-23a36877="" className="login-inp">
                                        <div data-v-23a36877="" className="xu_num">
                                            <input onFocus={this.btnTurn.bind(this)} onChange={this.mobile.bind(this)} data-v-23a36877="" type="tel" id="mobile" value={this.state.mobileValue}
                                                name="mobile" placeholder="手机号码" maxLength="11" autoComplete="off" />
                                        </div>
                                        <div data-v-23a36877="" className="xu_num ">
                                            <input onFocus={this.btnTurn.bind(this)} onChange={this.password.bind(this)} data-v-23a36877="" type="password" value={this.state.passwordValue}
                                                id="password" name="password" placeholder="请输入密码" autoComplete="off" />
                                        </div>
                                        <div data-v-23a36877="" className="xu_num xu_num01 ">
                                            <input onFocus={this.btnTurn.bind(this)} onChange={this.verify.bind(this)} data-v-23a36877="" type="text"
                                                id="verify_code" name="verify_code" placeholder="验证码" autoComplete="off"
                                                className="inp-code enter" />
                                            {/* <span data-v-23a36877="" id="sendBtn" mark="注册页获取验证码"
                                                className="getCodee">获取验证码</span>
                                            <span data-v-23a36877="" id="sendBtn_num"
                                                mark="注册页获取验证码" className="getCodee" style={{ display: "none" }}>
                                            </span> */}
                                            <canvas id="captcha" className="captcha"></canvas>
                                        </div>
                                    </div>
                                    <div data-v-23a36877="" className="center-box mt35">
                                        <a onClick={this.reg.bind(this)} data-v-23a36877="" mark="注册"
                                            href="###" type="button" className={this.state.turnRed ? "tijiao btn-red tijiao-active" : "tijiao btn-red"}>注册</a>
                                    </div>
                                </form>
                                <div data-v-23a36877="" id="coverContainer" style={{ display: "none" }}>
                                    <div data-v-23a36877="" className="cover"></div>
                                    <div data-v-23a36877="" id="TCaptcha" className="slider"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegPage;