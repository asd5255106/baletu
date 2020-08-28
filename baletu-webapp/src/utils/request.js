// 二次封装axios 安装axios
import axios from "axios";

// 封装
let request = axios.create({
  //request==axios
  baseURL: "/dev-api", // 基础路径
  timeout: 10000, // 请求超时时间：10s；如果10s后都没有响应，就断开请求
  // headers: {"Authorization" : "qwertyuio"}
});

export default request; // 封装好就导出request