const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (WrapComponent) => {
    WrapComponent.use(
        "/member",
        createProxyMiddleware({
            "target":"http://localhost:8080",
            changeOrigin: true
        })
    )
    
}