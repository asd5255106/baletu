import React from "react";
import { connect } from "react-redux";
/* 
    地图组件
*/

class Map extends React.Component {
    constructor() {
        super();

        this.state = {

        }
    }

    MP(ak) {
        return new Promise(function (resolve, reject) {
            // 动态创建script标签
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=init`;
            document.head.appendChild(script)
            window.init = () => {
                resolve(window.BMap)
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props.adress);
        // console.log(nextProps.adress);
        if (this.props.adress !== nextProps.adress) {
            this.MP("GKxdd53XchMiHQj7ora95mSXnEWPIi2I").then(BMap => {
                /* 
                    传详细地址和城市
                */
                // 创建Map实例
                var map = new BMap.Map('allmap');
                // 启用滚轮放大缩小
                map.enableScrollWheelZoom(true);
                // 创建地址解析器实例
                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(nextProps.adress, function (point) {
                    if (point) {
                        // 根据坐标显示地图
                        map.centerAndZoom(point, 15);
                        // 创建坐标标记点
                        map.addOverlay(new BMap.Marker(point));
                    } else {
                        alert("您选择地址没有解析到结果!");
                    }
                }, this.props.state.selectCity.city + "市");
            });
        }
    }

    render() {
        // console.log(this.props);

        //添加地图类型控件
        return (
            <div>
                <div id='allmap' style={{ width: "100%", height: "5.5rem" }}></div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        state
    }
})(Map);