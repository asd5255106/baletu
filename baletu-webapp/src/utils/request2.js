// 二次封装axios 安装axios
import axios from "axios";

// 封装
let request2 = axios.create({
  //request==axios
  baseURL: "/api", // 基础路径
  timeout: 10000, // 请求超时时间：10s；如果10s后都没有响应，就断开请求
});

export default request2; // 封装好就导出request