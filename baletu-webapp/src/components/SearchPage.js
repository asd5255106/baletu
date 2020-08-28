import React from "react";

import "../assets/css/search.css"

// 6.到组件内，接收store的数据
import { connect } from "react-redux";
import actions from "../store/actions";

import { Toast } from 'antd-mobile';


/* 
    搜索页
*/

class SearchPage extends React.Component {
    constructor() {
        super();

        this.state = {

        }
    }

    hideSearch() {
        this.props.dispatch(actions.showSearch.showSearch({show: false}));
    }

    render() {
        // console.log(this.props);

        return (
            <div data-v-cda44fd4="" style={{display: this.props.state.showSearch.show ? "block" : "none"}}>
                <div className="search_comtent">
                    <div className="search_title">
                        <form autoComplete="off">
                            <img alt="" src="//js.baletoo.cn/static/m/static/images/empty.png" id="getEmpty" style={{ display: "none" }} />
                            <input type="text" autoComplete="off" autoCorrect="off" id="search_input" placeholder="请输入商圈、地铁、小区" />
                            <span onClick={this.hideSearch.bind(this)}>取消</span>
                            <span style={{ display: "none" }}>搜索</span>
                        </form>
                        <div className="search_pd"></div>
                    </div>
                    <div className="empty">
                        <div className="hotSearch">
                            <div className="hotSearch_title">热门搜索</div>
                            <div className="search_list">
                                <ul onClick={() => {Toast.info("暂无此功能",1)}}><li>
                                    上大路
            </li><li>
                                        金桥
            </li><li>
                                        魔方公寓
            </li><li>
                                        七宝
            </li><li>
                                        五角场
            </li><li>
                                        徐汇
            </li><li>
                                        川沙
            </li><li>
                                        公寓
            </li><li>
                                        张江
            </li><li>
                                        宝山
            </li><li>
                                        九亭
            </li></ul>
                            </div>
                        </div>
                    </div>
                    <div className="notEmpty" style={{ display: "none" }}>
                        <ul></ul>
                        <ul></ul>
                        <ul style={{ display: "none" }}></ul>
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
})(SearchPage);