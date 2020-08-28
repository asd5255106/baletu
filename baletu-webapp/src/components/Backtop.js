import React from "react";

/* 
    回到顶部
*/

class Comheader extends React.Component {
    constructor() {
        super();

        this.state = {
            showBacktop: false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    // 功能: 页面滚动条事件
    handleScroll = () => {
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollY);
        // 功能: 当滚动条滚动到
        if (document.querySelector(this.props.class)) {
            let boxScrollTop = document.querySelector(this.props.class).offsetTop;
            if (scrollY >= boxScrollTop) {
                this.setState({
                    showBacktop: true
                })
            } else {
                this.setState({
                    showBacktop: false
                })
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    backtop() {
        window.scrollTo(0, 0);
    }

    render() {
        // console.log(this.props);

        return (
            <div onClick={this.backtop.bind(this)} data-v-6262a41f="" data-v-5e462810="" className="topBack" style={{ width: 1 * 50, height: 1.1 * 50, borderRadius: 1 * 50, display: this.state.showBacktop ? "block" : "none" }}  >
                <p data-v-6262a41f="">回到顶部</p>
            </div>
        );
    }
}

export default Comheader;