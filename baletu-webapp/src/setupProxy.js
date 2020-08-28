const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/dev-api', {
        target: 'http://120.24.32.2:8011',
        changeOrigin: true, // 是否跨域，如果target是域名则需要配置，如果是ip地址不需要
        pathRewrite: {
            "^/dev-api": "" // 把/dev-api 变成空
        }
    }));
    
    app.use(createProxyMiddleware('/api', {
        target: 'http://api.map.baidu.com',
        changeOrigin: true, // 是否跨域，如果target是域名则需要配置，如果是ip地址不需要
        pathRewrite: {
            "^/api": "" // 把/dev-api 变成空
        }
    }));
}