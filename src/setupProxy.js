const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.us5.datadoghq.com/api/v1', 
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
