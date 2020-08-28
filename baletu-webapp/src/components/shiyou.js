import React from "react";
// 6.到组件内，接收store的数据
import { connect } from "react-redux";
// 引入api
import renderListApi from "../api/renderListApi";
// 引入加载中antd组件
import { Toast } from 'antd-mobile';

/* 
    渲染列表组件
*/

class Renderlist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            renderList: [],
            page: 1,
            pagesize: 10,
            type: props.msg,
            goDown: 0
        }

        console.log(props);
    }

    // async getShiyoulist(page, pagesize, type, address) {
    //     try {
    //         let p = await renderListApi.getShiyoulist(page, pagesize, type, address);
    //         // console.log(p.data.data);
    //         if (p.data.flag) {
    //             let { renderList } = this.state;
    //             renderList = p.data.data;
    //             this.setState({
    //                 renderList
    //             })
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // componentDidMount() {
    //     // 一进来就获取数据
    //     this.getShiyoulist(1, 10, this.state.type, this.props.state.selectCity.address);
    //     // 页面滚动
    //     window.addEventListener('scroll', this.handleScroll.bind(this), false)
    // }

    // // 功能: 页面滚动条事件
    // handleScroll() {
    //     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //     let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //     // console.log(scrollTop);     // 动态变化
    //     // console.log(clientHeight);  // 667
    //     // console.log(scrollHeight);  // 2180
    //     // console.log(Math.ceil(scrollTop + clientHeight) >= scrollHeight);

    //     // 如果没有数据了, 就不再触发loadingToast
    //     if (this.state.goDown === scrollHeight) {
    //         // console.log("没数据了");
    //     } else {
    //         if (scrollHeight > clientHeight && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
    //             // console.log("滚动条到底了");
    //             // 记录到达底部的scrollHeight
    //             let { goDown } = this.state;
    //             goDown = scrollHeight;
    //             this.setState({
    //                 goDown
    //             });
    //             // 到达底部后再次发送请求
    //             this.loadingToast();
    //         }
    //     }
    // }

    // // // 加载中
    // loadingToast() {
    //     Toast.loading('Loading...', 0.5, () => {
    //         // console.log('Load complete !!!');
    //         let { pagesize } = this.state;
    //         pagesize += 10;
    //         this.setState({
    //             pagesize
    //         })
    //         // console.log(this.state.page, this.state.pagesize, this.state.type, this.props.state.selectCity.address);
    //         this.getRenderlist(this.state.page, this.state.pagesize, this.state.type, this.props.state.selectCity.address);
    //     });
    // }

    // componentDidUpdate(nextProps) {
    //     // console.log(nextProps);
    //     if (this.props.state.selectCity !== nextProps.state.selectCity) {
    //         this.getRenderlist(this.state.page, this.state.pagesize, this.state.type, this.props.state.selectCity.address);
    //     }
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll.bind(this), false)
    // }

    render() {
        console.log(this.props);

        return (
            <React.Fragment>
                {this.state.renderList.map(item => {
                    return <div className="house-card">
                        <div className="card-info clearfix">
                            <div className="list-box-left">
                                <div className="card-img">
                                    <img src="https://cdn.baletoo.cn/Uploads/topic/56/55382/oss_5ae7eb2cb1414.png@!topic-thumbnail" alt="" className="card-img-house" />
                                </div>

                            </div>

                            <ul className="card-text">
                                <li>
                                    <div className="card-text-name">浦东新区文怡苑1期</div>
                                    <div className="card-text-price">￥800 </div>
                                </li>
                                <li className="card-text-info">
                                    <span><i className="icon iconType-dj"><img src="https://js.baletoo.cn/static/m/static/images/find_roommate_singleRoom.png" alt="" /> </i>单间 </span>
                                    <span> <i className="icon iconRep-bx"><img src="https://js.baletoo.cn/static/m/static/images/find_roommate_people.png" alt="" /></i>不限</span>
                                    <span><i className="icon iconDate"><img src="https://js.baletoo.cn/static/m/static/images/find_roommate_checkIn.png" alt="" /></i>05月15日入住</span>
                                </li>

                                <li className="card-text-subway">11号线秀沿路</li>
                                <li className="card-text-service"><span>转租</span>
                                    <div className="text-info-day">2018-05-01</div>
                                </li>
                            </ul>

                        </div>
                    </div>
                })}
            </React.Fragment>
        );
    }
}

export default connect((state) => {
    return {
        state
    }
})(Renderlist);