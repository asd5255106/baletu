import React from "react";
// 6.到组件内，接收store的数据
import { connect } from "react-redux";
// 引入api
import renderListApi from "../api/renderListApi";
// 引入加载中antd组件
import { Toast } from 'antd-mobile';
// 引入withRouter高阶组件
import { withRouter } from "react-router-dom";

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
            goDown: 0,
            sort: "",
            opt: ""
        }

        // console.log(props);
    }

    async getRenderlist(page, pagesize, type, address, opt, sort) {
        try {
            // console.log(page, pagesize, type, address, opt, sort);
            let p = await renderListApi.getRenderlist(page, pagesize, type, address, opt, sort);
            // console.log(p.data.data);
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

    componentDidMount() {
        // 一进来就获取数据
        this.getRenderlist(1, 10, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
        // 页面滚动
        window.addEventListener('scroll', this.handleScroll)
    }

    // 功能: 页面滚动条事件
    handleScroll = () => {
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
            this.setState({
                pagesize: 10
            });
        } else {
            if (scrollHeight > clientHeight && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
                // console.log("滚动条到底了");
                // 记录到达底部的scrollHeight, 如果上一次的scrollHeight和本次的scrollHeight一样时, 则不再发送请求
                let { goDown } = this.state;
                // console.log(goDown);
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
            this.getRenderlist(this.state.page, this.state.pagesize, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
        });
    }

    // 功能: 更新props后发送请求
    componentDidUpdate(nextProps) {
        // console.log(nextProps);
        // 改变了户型就重新发送请求
        if(this.props.msg !== nextProps.msg){
            this.getRenderlist(this.state.page, this.state.pagesize, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
        }

        // 改变了address就重新发送请求
        if (this.props.state.selectCity !== nextProps.state.selectCity) {
            this.setState({
                pagesize: 10
            })
            // console.log(this.state.page, this.state.pagesize, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
            this.getRenderlist(this.state.page, this.state.pagesize, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
            // 重新设置goDown
            // console.log(this.state.goDown);
            this.setState({
                goDown: 0
            })
            window.scrollTo(0, 0);
        }
        // 改变了排序就重新发送请求
        if (this.props.sort !== nextProps.sort) {
            // console.log(this.state.page, this.state.pagesize, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
            this.getRenderlist(this.state.page, this.state.pagesize, this.props.msg, this.props.state.selectCity.address, this.props.opt, this.props.sort);
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    // 功能: 带着home_id和address跳转到详情页
    goDetail(home_id) {
        // console.log(home_id, this.props.state.selectCity.address);
        let address = this.props.state.selectCity.address;
        this.props.history.push({
            pathname: "/xiangqing",
            search: `?home_id=${home_id}&address=${address}`,
            // query刷新丢失
            // query: {
            //     home_id,
            //     address
            // }
        })
    }

    render() {
        // console.log(this.props);

        return (
            <React.Fragment>
                {this.state.renderList.map(item => {
                    return <div onClick={this.goDetail.bind(this, item.home_id)} key={item.home_id} data-v-4cd80081="" className="findhouse-list">
                        <div data-v-57b69ae6="" data-v-4cd80081="" className="house-card" div_source="120">
                            <div data-v-57b69ae6="" className="base-info">
                                <div data-v-57b69ae6="" className="main-photo">
                                    <div data-v-57b69ae6="" className="main-image"
                                        style={{ backgroundImage: `url(${item.img})` }}>
                                    </div>
                                    <div data-v-57b69ae6="" className="house-logo">
                                        <img data-v-57b69ae6=""
                                            src="https://js.baletoo.cn/Public/app/house_list/better_house@3x.png" alt=""
                                            className="img" />
                                    </div>
                                    <div data-v-57b69ae6="" className="live-photo">{item.tishi}</div>
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
                                        className="bold">{item.price}</span>元
                                    </div>
                                    {/* <ul data-v-57b69ae6="" className="activity-info">
                                                    <li data-v-57b69ae6=""><img data-v-57b69ae6=""
                                                        src="//js.baletoo.cn/Public/app/house_list/seven_day_refund@3x.png" alt=""
                                                        className="img" /> <span data-v-57b69ae6=""></span></li>
                                                </ul> */}
                                </div>
                            </div>
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
})(withRouter(Renderlist));