const {createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:3001/' }));
  // app.use(proxy('/service', { target: 'http://localhost:3002/' }));
  app.use("/api", createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: { "^/" : "/api/" },
  }))
  
};