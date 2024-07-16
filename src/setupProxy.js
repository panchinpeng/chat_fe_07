const { createProxyMiddleware } = require('http-proxy-middleware');

export default function(app) {
    app.use("/api", createProxyMiddleware({
        target: "http://localhost:3001"
    }))

    app.use("/service", createProxyMiddleware({
        target: "http://localhost:3002"
    }))
}